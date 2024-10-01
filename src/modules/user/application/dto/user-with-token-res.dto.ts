import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UserWithTokenResDto extends UserDto {
    @ApiProperty()
    token: string;
}