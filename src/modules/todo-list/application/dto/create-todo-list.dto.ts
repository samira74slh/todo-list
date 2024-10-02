import { OmitType } from "@nestjs/swagger";
import { TodoListDto } from "./todo-list.dto";

export class CreateTodoListDto extends OmitType(TodoListDto, ['_id', 'userId']) { }