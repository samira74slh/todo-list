import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ofType, Saga } from "@nestjs/cqrs";
import { catchError, from, Observable, Subject, switchMap } from "rxjs";
import { BulkCreateTodoListEvent } from "../events/bulk-create-todo-items.event";
import { Types } from 'mongoose';
import { BulkCreateTodoItemCommand } from '../commands/bulk-create-todo-item.command';
import { ETodoItem } from '../../domain/entities/todo-item.entity';
import { Priority } from '../../domain/value-objects/priority.vo';
import { UpdateTodoListCommand } from '../../../todo-list/application/commands/update-todo-list.command';
import { TodoItemDto } from "../dto/todo-item.dto";
import { CancelBulkCreateTodoItemCommand } from "../commands/cancel-bulk-create-todo-item.command";
import { RevertUpdateTodoListCommand } from "../commands/revert-update-todo-item.command";

@Injectable()
export class BulkCreateTodoItemsSagas {
    private responseSubject = new Subject<TodoItemDto[]>();
    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus
    ) { }
    @Saga()
    bulkCreateTodoItemsSaga = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(BulkCreateTodoListEvent),
            switchMap((event: BulkCreateTodoListEvent) =>
                from(this.processCreation(event)).pipe(
                    catchError((error) => {
                        console.error(`Saga failed: ${error.message}`);
                        return from([]);
                    })
                )
            )
        )
    }

    private async processCreation({ todoItems }: BulkCreateTodoListEvent): Promise<void> {
        let createdItemIds: Types.ObjectId[] = [];
        const todoListId = todoItems[0].todoListId;
        try {
            // create todoItems
            let items: ETodoItem[] = todoItems.map(({ title, description, todoListId, priority }) =>
                new ETodoItem(null, title, description, todoListId, new Priority(priority))
            );
            let newTodoItems = await this.commandBus.execute(new BulkCreateTodoItemCommand(items));
            // Promise.all(newTodoItems.map(({ _id }) => itemIds.push(_id)));
            createdItemIds = newTodoItems.map(({ _id }) => _id);
            //push toditems to todoList
            await this.commandBus.execute(new UpdateTodoListCommand(todoListId, undefined, createdItemIds));
            this.responseSubject.next(newTodoItems);
        } catch (error) {
            // rollback
            if (createdItemIds.length > 0) {
                await this.commandBus.execute(new CancelBulkCreateTodoItemCommand(createdItemIds));
            }
            await this.commandBus.execute(new RevertUpdateTodoListCommand(todoListId, createdItemIds));
            throw new Error(`Rollback executed due to: ${error.message}`);
        }
    }

    getResponse(): Observable<TodoItemDto[]> {
        return this.responseSubject.asObservable();
    }
}
