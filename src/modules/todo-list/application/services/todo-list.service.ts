import { Injectable, Param } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { CreateTodoListDto } from "../dto/create-todo-list.dto";
import { UpdateTodoListDto } from "../dto/update-todo-list.dto";
import { IdDTo } from '../../../../shared/dto/id.dto';
import { UpdateTodoListCommand } from '../commands/update-todo-list.command';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';
import { GetTodoListsQuery } from '../queries/get-todo-listes.query';
import { GetTodoListByIdQuery } from '../queries/get-todo-list.query';
import { TodoListDocument } from '../../infrastructure/database/todo-list.schema';
import { CreateTodoListEvent } from '../events/create-todo-list.event';
import { UserDocument } from '../../../user/infrastructure/database/user.schema';

@Injectable()
export class TodoListService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
    ) { }

    async createTodoList({ title, todoItems }: CreateTodoListDto, { _id }: UserDocument): Promise<TodoListDocument> {
        try {
            return await this.eventBus.publish(new CreateTodoListEvent(title, _id, todoItems));
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTodoList({ id }: IdDTo, { title }: UpdateTodoListDto, user: UserDocument): Promise<TodoListDocument | string> {
        try {
            let { userId } = await this.queryBus.execute(new GetTodoListByIdQuery(id));
            if (userId == user._id) {
                //todo :update items saga
                return await this.commandBus.execute(new UpdateTodoListCommand(id, title));
            } else return 'Not permission';
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTodoList({ id }: IdDTo, user: UserDocument): Promise<void | string> {
        try {
            let { userId } = await this.queryBus.execute(new GetTodoListByIdQuery(id));
            if (userId == user._id) {
                return await this.eventBus.publish(new DeleteTodoListCommand(id));
            } else return 'Not permission';

        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllUserTodoLists({ id }: IdDTo, user: UserDocument): Promise<TodoListDocument[] | string> {
        try {
            if (id == user._id) {
                return await this.queryBus.execute(new GetTodoListsQuery(id));
            } else return 'Not permission';
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTodoListById({ id }: IdDTo): Promise<TodoListDocument> {
        try {
            return await this.queryBus.execute(new GetTodoListByIdQuery(id));
        } catch (error) {
            throw new Error(error);
        }
    }
}