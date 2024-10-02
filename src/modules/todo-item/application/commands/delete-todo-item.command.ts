import { Types } from "mongoose";

export class DeleteTodoItemCommand {
    constructor(public readonly id: Types.ObjectId) { }
}