import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { UserDto } from "./user.dto";

export class UserWithTokenResDto extends PickType(UserDto, ['_id', 'username']) {
    @ApiProperty()
    token: string;
}