import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, mergeMap, Observable } from "rxjs";
import { CreateTodoListEvent } from "../events/create-todo-list.event";
import { CreateTodoListCommand } from "../commands/create-todo-list.command";
import { AddUserTodoListsCommand } from "src/modules/user/application/commands/add-user-todo-lists.command";
import { BulkCreateTodoItemCommand } from "src/modules/todo-item/application/commands/bulk-create-todo-item.command";
import { ETodoItem } from "src/modules/todo-item/domain/entities/todo-item.entity";
import { Priority } from "src/modules/todo-item/domain/value-objects/priority.vo";
import { ObjectId, Types } from 'mongoose';
import { MongooseOptionsFactory } from '@nestjs/mongoose';
import { UpdateTodoListCommand } from "../commands/update-todo-list.command";
import { DeleteTodoListEvent } from "../events/delete-todo-list.event";
import { DeleteTodoListCommand } from "../commands/delete-todo-list.command";
import { DeleteItemByListIdHandler } from "src/modules/todo-item/application/handlers/delete-item-by-list-id.handler";
import { DeleteItemByListIdCommand } from "src/modules/todo-item/application/commands/delete-item-by-list-id.command";

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
