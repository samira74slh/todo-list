import { Types } from "mongoose";

export class DeleteUserTodoListsCommand {
    constructor(
        public readonly id: Types.ObjectId,
        public readonly todoLists: Types.ObjectId[]
    ) { }
}