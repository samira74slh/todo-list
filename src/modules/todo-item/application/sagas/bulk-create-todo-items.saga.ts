import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, ofType, Saga } from "@nestjs/cqrs";
import { catchError, from, map, Observable, of, switchMap } from "rxjs";
import { BulkCreateTodoListEvent } from "../events/bulk-create-todo-items.event";
import { BulkCreateTodoItemCommand } from "src/modules/todo-item/application/commands/bulk-create-todo-item.command";
import { ETodoItem } from "src/modules/todo-item/domain/entities/todo-item.entity";
import { Priority } from "src/modules/todo-item/domain/value-objects/priority.vo";
import { Types } from 'mongoose';
import { UpdateTodoListCommand } from "src/modules/todo-list/application/commands/update-todo-list.command";

@Injectable()
export class BulkCreateTodoItemsSagas {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus
    ) { }

    @Saga()
    bulkCreateTodoItemsSaga = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(BulkCreateTodoListEvent),
            switchMap((event: BulkCreateTodoListEvent) => from(this.processOrderCreation(event)))
        )
    }

    private async processOrderCreation({ todoItems }: BulkCreateTodoListEvent): Promise<void> {
        try {// create todoItems
            let items: ETodoItem[] = [];
            for (const { title, todoListId, description, priority } of todoItems) {
                items.push(new ETodoItem(null, title, description, todoListId, new Priority(priority)));
            }
            let newTodoItems = await this.commandBus.execute(new BulkCreateTodoItemCommand(items));
            let itemIds: Types.ObjectId[] = [];
            Promise.all(newTodoItems.map(({ _id }) => itemIds.push(_id)));
            //push toditems to todoList
            await this.commandBus.execute(new UpdateTodoListCommand(todoItems[0].todoListId, undefined, itemIds));
            return newTodoItems;
        } catch (error) {
            //todo :add cancel command
            console.error(`Creation Failed: ${error.message}`)
        }
    }
}
