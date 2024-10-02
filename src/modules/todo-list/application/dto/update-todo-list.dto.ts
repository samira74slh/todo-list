import { PickType } from "@nestjs/swagger";
import { TodoListDto } from "./todo-list.dto";

export class UpdateTodoListDto extends PickType(TodoListDto, ['title']) { }