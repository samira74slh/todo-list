import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, ofType, Saga } from "@nestjs/cqrs";
import { catchError, from, map, Observable, Subject, switchMap } from "rxjs";
import { DeleteTodoListEvent } from "../events/delete-todo-list.event";
import { DeleteTodoListCommand } from "../commands/delete-todo-list.command";
import { DeleteItemByListIdCommand } from '../../../todo-item/application/commands/delete-item-by-list-id.command';
import { CreateTodoListCommand } from "../commands/create-todo-list.command";
import { TodoListDocument } from "../../infrastructure/database/todo-list.schema";

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
            switchMap((event: DeleteTodoListEvent) =>
                from(this.process(event)).pipe(
                    catchError((error) => {
                        console.error(`Saga failed: ${error.message}`);
                        return from([]);
                    })
                )
            )
        );
    }

    private async process({ id }: DeleteTodoListEvent): Promise<void> {
        let todoList: TodoListDocument;
        try {
            //delete todolist
            todoList = await this.commandBus.execute(new DeleteTodoListCommand(id));
            //delete todoItems
            await this.commandBus.execute(new DeleteItemByListIdCommand(id))

        } catch (error) {
            // rollback
            let { _id, title, userId, todoItems } = todoList;
            await this.commandBus.execute(new CreateTodoListCommand(_id, title, userId, todoItems))
            throw new Error(`Rollback executed due to: ${error.message}`);
        }
    }
}
