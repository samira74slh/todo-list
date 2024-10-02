import { Types } from "mongoose";
import { Password } from "../value-objects/password.vo";
import { entityIdType } from "../../../../shared/types/id-type";

export class EUser {
    constructor(
        public _id: entityIdType,
        public username: string,
        public password: Password
    ) { }
}