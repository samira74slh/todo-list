import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../../infrastructure/database/user.schema';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserWithTokenResDto } from '../dto/user-with-token-res.dto';
import { AuthService } from 'src/modules/auth/application/services/auth.service';
import { forwardRef, Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    async execute(command: CreateUserCommand): Promise<UserWithTokenResDto> {
        const { password, username } = command;
        let user = new User();
        user.username = username;
        user.password = await password.getValue();
        let newUser = await this.userRepository.create(user);
        delete newUser.password;
        const token = await this.authService.getAccessToken(newUser);
        return { ...newUser, token };
    }
}