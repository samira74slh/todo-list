import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { BulkCreateTodoItemDto } from "../dto/create-todo-item.dto";
import { UserDocument } from "src/modules/user/infrastructure/database/user.schema";
import { UpdateTodoItemDto } from "../dto/update-todo-item.dto";
import { IdDTo } from '../../../../shared/dto/id.dto';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';
import { GetTodoItemsQuery } from '../queries/get-todo-items.query';
import { GetTodoItemByIdQuery } from '../queries/get-todo-item.query';
import { TodoItemDocument } from '../../infrastructure/database/todo-item.schema';
import { Priority } from '../../domain/value-objects/priority.vo';
import { ETodoItem } from '../../domain/entities/todo-item.entity';
import { BulkCreateTodoItemCommand } from '../commands/bulk-create-todo-item.command';

@Injectable()
export class TodoItemService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    async createTodoItem({ todoItems }: BulkCreateTodoItemDto): Promise<TodoItemDocument> {
        try {
            let items: ETodoItem[] = [];
            for (const { title, todoListId, description, priority } of todoItems) {
                items.push(new ETodoItem(null, title, description, todoListId, new Priority(priority)));
            }
            return await this.commandBus.execute(new BulkCreateTodoItemCommand(items));
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTodoItem({ id }: IdDTo, { title, description, priority }: UpdateTodoItemDto): Promise<TodoItemDocument> {
        try {
            return await this.commandBus.execute(new UpdateTodoItemCommand(id, title, description, new Priority(priority)));
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTodoItem({ id }: IdDTo, user: UserDocument): Promise<void | string> {
        try {
            let { userId } = await this.queryBus.execute(new GetTodoItemByIdQuery(id));
            if (userId == user._id) {
                return await this.commandBus.execute(new DeleteTodoItemCommand(id));
            } else return 'Not permission';

        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllUserTodoItems({ id }: IdDTo): Promise<TodoItemDocument[] | string> {
        try {
                return await this.queryBus.execute(new GetTodoItemsQuery(id));
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTodoItemById({ id }: IdDTo): Promise<TodoItemDocument> {
        try {
            return await this.queryBus.execute(new GetTodoItemByIdQuery(id));
        } catch (error) {
            throw new Error(error);
        }
    }
}