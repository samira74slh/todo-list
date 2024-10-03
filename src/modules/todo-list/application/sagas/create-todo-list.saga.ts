import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, ofType, Saga } from "@nestjs/cqrs";
import { catchError, from, Observable, Subject, switchMap } from "rxjs";
import { CreateTodoListEvent } from "../events/create-todo-list.event";
import { CreateTodoListCommand } from "../commands/create-todo-list.command";
import { Types } from 'mongoose';
import { UpdateTodoListCommand } from "../commands/update-todo-list.command";
import { AddUserTodoListsCommand } from '../../../user/application/commands/add-user-todo-lists.command';
import { ETodoItem } from '../../../todo-item/domain/entities/todo-item.entity';
import { Priority } from '../../../todo-item/domain/value-objects/priority.vo';
import { BulkCreateTodoItemCommand } from '../../../todo-item/application/commands/bulk-create-todo-item.command';
import { TodoListDocument } from "../../infrastructure/database/todo-list.schema";
import { DeleteTodoListCommand } from "../commands/delete-todo-list.command";
import { CancelBulkCreateTodoItemCommand } from "src/modules/todo-item/application/commands/cancel-bulk-create-todo-item.command";
import { RevertUpdateTodoListCommand } from "src/modules/todo-item/application/commands/revert-update-todo-item.command";
import { DeleteUserTodoListsCommand } from "src/modules/user/application/commands/delete-user-todo-lists.command";
import { TodoListDto } from "../dto/todo-list.dto";

@Injectable()
export class CreateTodoListSagas {
    private responseSubject = new Subject<TodoListDto>();
    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus
    ) { }

    @Saga()
    createTodoListSaga = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CreateTodoListEvent),
            switchMap((event: CreateTodoListEvent) =>
                from(this.processCreation(event)).pipe(
                    catchError((error) => {
                        console.error(`Saga failed: ${error.message}`);
                        return from([]);
                    })
                )
            )
        );
    }

    private async processCreation({ title, todoItems, userId }: CreateTodoListEvent): Promise<void> {
        let todoListId: Types.ObjectId;
        let itemIds: Types.ObjectId[] = []
        try {
            //add todolist
            let todoList = await this.commandBus.execute(new CreateTodoListCommand(null, title, userId, undefined));
            todoListId = todoList._id
            //push todolist to user
            await this.commandBus.execute(new AddUserTodoListsCommand(userId, [todoList._id]))

            if (todoItems?.length > 0) {
                // create todoItems
                let items: ETodoItem[] = todoItems.map(({ title, description, priority }) =>
                    new ETodoItem(null, title, description, todoList._id, new Priority(priority)));
                let newTodoItems = await this.commandBus.execute(new BulkCreateTodoItemCommand(items));
                itemIds = newTodoItems.map(({ _id }) => _id);

                //push toditems to todoList
                todoList = await this.commandBus.execute(new UpdateTodoListCommand(todoList._id, undefined, itemIds));
            }
            this.responseSubject.next(todoList);
        } catch (error) {
            // rollback
            if (todoListId) {
                await this.commandBus.execute(new DeleteTodoListCommand(todoListId));
                await this.commandBus.execute(new DeleteUserTodoListsCommand(userId, [todoListId]));
                if (itemIds?.length > 0) {
                    await this.commandBus.execute(new CancelBulkCreateTodoItemCommand(itemIds));
                    await this.commandBus.execute(new RevertUpdateTodoListCommand(todoListId, itemIds));
                }
            }
            throw new Error(`Rollback executed due to: ${error.message}`);
        }
    }

    getResponse(): Observable<TodoListDto> {
        return this.responseSubject.asObservable();
    }
}
