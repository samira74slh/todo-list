import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { BulkCreateTodoItemDto } from "../dto/create-todo-item.dto";
import { UpdateTodoItemDto } from "../dto/update-todo-item.dto";
import { IdDTo } from '../../../../shared/dto/id.dto';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';
import { GetTodoItemsQuery } from '../queries/get-todo-items.query';
import { GetTodoItemByIdQuery } from '../queries/get-todo-item.query';
import { TodoItemDocument } from '../../infrastructure/database/todo-item.schema';
import { Priority } from '../../domain/value-objects/priority.vo';
import { BulkCreateTodoListEvent } from '../events/bulk-create-todo-items.event';
import { UserDocument } from '../../../user/infrastructure/database/user.schema';

@Injectable()
export class TodoItemService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
    ) { }

    async bulkCreateTodoItem({ todoItems }: BulkCreateTodoItemDto): Promise<TodoItemDocument> {
        try {
            return await this.eventBus.publish(new BulkCreateTodoListEvent(todoItems));
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