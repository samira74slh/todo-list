import { Types } from "mongoose";
import { Password } from "../value-objects/password.vo";

export class EUser {
    constructor(
        public _id: string | Types.ObjectId | null,
        public username: string,
        public password: Password
    ) { }
}