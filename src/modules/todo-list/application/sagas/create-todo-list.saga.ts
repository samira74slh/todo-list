import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map,  Observable } from "rxjs";
import { CreateTodoListEvent } from "../events/create-todo-list.event";
import { CreateTodoListCommand } from "../commands/create-todo-list.command";
import {  Types } from 'mongoose';
import { UpdateTodoListCommand } from "../commands/update-todo-list.command";
import { AddUserTodoListsCommand } from '../../../user/application/commands/add-user-todo-lists.command';
import { ETodoItem } from '../../../todo-item/domain/entities/todo-item.entity';
import { Priority } from '../../../todo-item/domain/value-objects/priority.vo';
import { BulkCreateTodoItemCommand } from '../../../todo-item/application/commands/bulk-create-todo-item.command';

@Injectable()
export class CreateTodoListSagas {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus
    ) { }

    @Saga()
    createTodoListSaga = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CreateTodoListEvent),
            map(async ({ title, todoItems, userId }: CreateTodoListEvent) => {
                //add todolist
                let todoList = await this.commandBus.execute(new CreateTodoListCommand(null, title, userId, undefined));
                //push todolist to user
                await this.commandBus.execute(new AddUserTodoListsCommand(userId, [todoList._id]))
                if (todoItems?.length > 0) {
                    // create todoItems
                    let items: ETodoItem[] = [];
                    Promise.all(todoItems.map(({ title, description, priority }) => {
                        items.push(new ETodoItem(null, title, description, todoList._id, new Priority(priority)))
                    }));
                    let newTodoItems = await this.commandBus.execute(new BulkCreateTodoItemCommand(items));
                    let itemIds: Types.ObjectId[] = []
                    Promise.all(newTodoItems.map(({ _id }) => itemIds.push(_id)));
                    //push toditems to todoList
                    todoList = await this.commandBus.execute(new UpdateTodoListCommand(todoList._id, undefined, itemIds));
                }
                return todoList;
            }),
        );
    }
}
