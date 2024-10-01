import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../../infrastructure/database/user.schema";
import { CreateUserCommand } from "../commands/create-user.command";
import { Password } from "../../domain/value-objects/password.vo";
import { IdDTo } from "src/shared/dto/id.dto";
import { GetUserByIdQuery } from "../queries/get-user.query";

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createUser(data: CreateUserDto): Promise<User> {
        try {
            return await this.commandBus.execute(new CreateUserCommand('', data.username, new Password(data.password)));
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(data: IdDTo): Promise<User> {
        try {
            return await this.queryBus.execute(new GetUserByIdQuery(data.id));
        } catch (error) {
            throw new Error(error);
        }
    }
}