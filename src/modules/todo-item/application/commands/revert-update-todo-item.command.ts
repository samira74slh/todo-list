import { Types } from "mongoose";

export class RevertUpdateTodoListCommand {
    constructor(
        public readonly id: Types.ObjectId,
        public readonly itemIds: Types.ObjectId[]
    ) { }
}