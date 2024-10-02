import { Injectable, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateTodoListDto } from "../dto/create-todo-list.dto";
import { CreateTodoListCommand } from "../commands/create-todo-list.command";
import { UserDocument } from "src/modules/user/infrastructure/database/user.schema";
import { UpdateTodoListDto } from "../dto/update-todo-list.dto";
import { IdDTo } from '../../../../shared/dto/id.dto';
import { UpdateTodoListCommand } from '../commands/update-todo-list.command';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';
import { GetTodoListsQuery } from '../queries/get-todo-listes.query';
import { GetTodoListByIdQuery } from '../queries/get-todo-list.query';
import { TodoListDocument } from '../../infrastructure/database/todo-list.schema';
import { GetTodoListByIdHandler } from '../handlers/get-todo-list.handler';

@Injectable()
export class TodoListService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    async createTodoList({ title, todoItems }: CreateTodoListDto, { _id }: UserDocument): Promise<TodoListDocument> {
        try {
            //todo :if todoItem >> creat items
            return await this.commandBus.execute(new CreateTodoListCommand(null, title, _id, todoItems));
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
                //todo :delete items saga
                return await this.commandBus.execute(new DeleteTodoListCommand(id));
            } else return 'Not permission';

        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllUserTodoLists({ id }: IdDTo, user: UserDocument): Promise<TodoListDocument[] | string> {
        try {
            if (id == user._id) {
                console.log()
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