import { OmitType, PartialType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UserOptionalDto extends PartialType(OmitType(UserDto, ['password'])) { }