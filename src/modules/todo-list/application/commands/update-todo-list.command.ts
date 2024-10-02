import { Types } from "mongoose";

export class UpdateTodoListCommand {
    constructor(
        public readonly id: Types.ObjectId,
        public readonly title: string,
        public readonly todoItems?: Types.ObjectId[],
    ) { }
}