import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from '../queries/get-user.query';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@QueryHandler(GetUserByIdQuery)
export class GetUserHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(private readonly UserRepository: UserRepository) { }

    async execute(query: GetUserByIdQuery): Promise<any> {
        return this.UserRepository.findById(query.id);
    }
}