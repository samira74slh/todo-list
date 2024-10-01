import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class IdDTo {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @Transform(({ value }) => Types.ObjectId.createFromHexString(value))
    id: Types.ObjectId;
}