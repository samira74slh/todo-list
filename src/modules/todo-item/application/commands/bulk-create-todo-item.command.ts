import { ETodoItem } from "../../domain/entities/todo-item.entity";

export class BulkCreateTodoItemCommand {
    constructor(
        public readonly todoItems: ETodoItem[]
    ) { }
}