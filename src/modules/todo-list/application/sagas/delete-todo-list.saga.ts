import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map,  Observable } from "rxjs";
import { DeleteTodoListEvent } from "../events/delete-todo-list.event";
import { DeleteTodoListCommand } from "../commands/delete-todo-list.command";
import { DeleteItemByListIdCommand } from '../../../todo-item/application/commands/delete-item-by-list-id.command';

@Injectable()
export class DeleteTodoListSagas {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus
    ) { }

    @Saga()
    deleteTodoListSaga = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(DeleteTodoListEvent),
            map(async ({ id }: DeleteTodoListEvent) => {
                //delete todolist
                let todoList = await this.commandBus.execute(new DeleteTodoListCommand(id));
                //delete todoItems
                await this.commandBus.execute(new DeleteItemByListIdCommand(id))
                return todoList;
            }),
        );
    }
}
