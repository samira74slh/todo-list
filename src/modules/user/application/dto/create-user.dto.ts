import { OmitType, PickType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class CreateUserDto extends OmitType(UserDto, ['_id']) { }