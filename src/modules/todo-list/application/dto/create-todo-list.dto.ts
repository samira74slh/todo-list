import { ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { LocalTodoItemDto, TodoListDto } from "./todo-list.dto";
import { IsArray, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { map } from 'rxjs';

export class CreateTodoListDto extends OmitType(TodoListDto, ['_id', 'userId', 'todoItems']) {
    @ApiPropertyOptional({
        type: [LocalTodoItemDto]
    })
    @IsArray()
    @IsOptional()
    todoItems?: LocalTodoItemDto[];

}