import { ApiProperty } from "@nestjs/swagger";
import { Min } from "class-validator";

export class UserDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    @Min(8)
    password: string;
}