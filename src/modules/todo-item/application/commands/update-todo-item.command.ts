import { Types } from "mongoose";
import { Priority } from "../../domain/value-objects/priority.vo";

export class UpdateTodoItemCommand {
    constructor(
        public readonly id: Types.ObjectId,
        public readonly title: string,
        public description: string,
        public priority: Priority
    ) { }
}