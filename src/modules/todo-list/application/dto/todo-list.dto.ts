import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { TodoItemDto } from '../../../todo-item/application/dto/todo-item.dto';
import { idType } from '../../../../shared/types/id-type';

export class LocalTodoItemDto extends PickType(TodoItemDto, ['description', 'priority', 'title']) { }

export class TodoListDto {
    @ApiProperty()
    _id: idType;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => Types.ObjectId.createFromHexString(value))
    userId: Types.ObjectId;

    @ApiPropertyOptional({
        type: [String]
    })
    @IsArray()
    @IsOptional()
    @Transform(({ value }) => value.split(',')?.map((val: string) => Types.ObjectId.createFromHexString(val)))
    todoItems?: Types.ObjectId[];
}

