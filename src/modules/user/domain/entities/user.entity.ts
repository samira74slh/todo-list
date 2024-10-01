import { Password } from "../value-objects/password.vo";

export class EUser {
    constructor(
        public readonly _id: string | null,
        public username: string,
        public password: Password
    ) { }
}