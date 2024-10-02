import { Types } from "mongoose";

export class AddUserTodoListsCommand {
    constructor(
        public readonly id: Types.ObjectId,
        public readonly todoLists: Types.ObjectId[]
    ) { }
}