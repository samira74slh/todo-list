import { Types } from "mongoose";

export class DeleteItemByListIdCommand {
    constructor(public readonly id: Types.ObjectId) { }
}