import { OmitType } from "@nestjs/swagger";
import { TodoItemDto } from "./todo-item.dto";

export class UpdateTodoItemDto extends OmitType(TodoItemDto, ['_id', 'todoListId']) { }