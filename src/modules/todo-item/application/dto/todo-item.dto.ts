import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { idType } from "src/shared/types/id-type";
import { PriorityLevel } from "../enum/priority-level.enum";

export class TodoItemDto {
    @ApiProperty()
    _id: idType;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        enum: PriorityLevel
    })
    @IsNotEmpty()
    @IsEnum(PriorityLevel)
    priority: PriorityLevel;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => Types.ObjectId.createFromHexString(value))
    todoListId: Types.ObjectId;

}