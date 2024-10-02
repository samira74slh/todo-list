import { Types } from "mongoose";

export class DeleteTodoListCommand {
    constructor(public readonly id: Types.ObjectId) { }
}