import { Types } from "mongoose";
import { idType } from "../../../../shared/types/id-type";

export interface IJWTPayload {
    _id: idType;
    username: string;
}