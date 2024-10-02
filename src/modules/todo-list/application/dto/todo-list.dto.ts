import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { idType } from "src/shared/types/id-type";

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
        type: String
    })
    @IsOptional()
    @Transform(({ value }) => value?.map((val: string) => Types.ObjectId.createFromHexString(val)))
    todoItems?: Types.ObjectId[];
}