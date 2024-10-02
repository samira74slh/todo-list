import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { CreateUserDto } from "../dto/create-user.dto";
import { User, UserDocument } from "../../infrastructure/database/user.schema";
import { CreateUserCommand } from "../commands/create-user.command";
import { Password } from "../../domain/value-objects/password.vo";
import { IdDTo } from "../../../../shared/dto/id.dto";
import { GetUserByIdQuery } from "../queries/get-user.query";
import { UserOptionalDto } from "../dto/user-optional.dto";
import { GetUserByFilterQuery } from "../queries/get-user-by-filter.query";
import { UserWithTokenResDto } from "../dto/user-with-token-res.dto";
import { UserWelcomeEvent } from "../events/user-welcom.event";
import { AuthService } from '../../../auth/application/services/auth.service';

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    async createUser(data: CreateUserDto): Promise<UserWithTokenResDto | string> {
        try {
            const user = await this.queryBus.execute(new GetUserByFilterQuery(undefined, data.username));
            if (user) {
                return 'Duplicate username'
            } else {
                return await this.commandBus.execute(new CreateUserCommand(null, data.username, new Password(data.password)));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async login({ username, _id }: UserDocument): Promise<UserWithTokenResDto> {
        try {
            const token = await this.authService.getAccessToken({ username, _id });
            await this.eventBus.publish(new UserWelcomeEvent(username));
            return {
                _id,
                username,
                token
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserById({ id }: IdDTo): Promise<UserWithTokenResDto | string> {
        try {
            const user = await this.queryBus.execute(new GetUserByIdQuery(id));
            if (!user)
                return "User not found"
            else
                return { _id: user._id, username: user.username, token: user.token }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByFilter(data: UserOptionalDto): Promise<User> {
        try {
            const { _id, username } = data;
            return await this.queryBus.execute(new GetUserByFilterQuery(_id, username));
        } catch (error) {
            throw new Error(error);
        }
    }
}