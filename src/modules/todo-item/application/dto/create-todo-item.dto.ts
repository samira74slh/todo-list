import { ApiProperty, OmitType } from "@nestjs/swagger";
import { TodoItemDto } from "./todo-item.dto";
import { IsArray } from "class-validator";

export class CreateTodoItemDto extends OmitType(TodoItemDto, ['_id']) { }
export class BulkCreateTodoItemDto {
    @ApiProperty({
        type: [CreateTodoItemDto]
    })
    @IsArray()
    todoItems: CreateTodoItemDto[]

}