import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { Types } from "mongoose";
import { idType } from "src/shared/types/id-type";

export class UserDto {
    @ApiProperty()
    _id: idType;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}