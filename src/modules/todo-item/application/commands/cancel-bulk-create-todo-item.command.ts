import { Types } from "mongoose";

export class CancelBulkCreateTodoItemCommand {
    constructor(
        public readonly itemIds: Types.ObjectId[]
    ) { }
}