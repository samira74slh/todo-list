import { Password } from "../value-objects/password.vo";

export class EUser {
    constructor(
        public readonly id: string,
        public username: string,
        public password: Password
    ) { }
}