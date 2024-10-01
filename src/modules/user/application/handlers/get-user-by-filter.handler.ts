import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { GetUserByFilterQuery } from "../queries/get-user-by-filter.query";

@QueryHandler(GetUserByFilterQuery)
export class GetUserByFilterHandler implements IQueryHandler<GetUserByFilterQuery> {
    constructor(private readonly UserRepository: UserRepository) { }

    async execute(query: GetUserByFilterQuery): Promise<any> {
        for (let q in query)
            if (query[q] == null || query[q] == undefined)
                delete query[q];
        return this.UserRepository.findOne(query);
    }
}