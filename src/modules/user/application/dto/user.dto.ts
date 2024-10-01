import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { Types } from "mongoose";

export class UserDto {
    @ApiProperty()
    _id: string | Types.ObjectId;

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