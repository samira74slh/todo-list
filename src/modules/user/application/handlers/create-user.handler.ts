import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../../infrastructure/database/user.schema';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(command: CreateUserCommand) {
        //todo add new Password in userservice
        const { password, username } = command;
        let user = new User();
        user.username = username;
        user.password = password.getValue();
        return this.userRepository.create(user);
    }
}