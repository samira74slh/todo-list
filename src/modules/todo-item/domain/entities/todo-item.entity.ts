import { entityIdType } from "../../../../shared/types/id-type";
import { Types } from "mongoose";
import { Priority } from "../value-objects/priority.vo";

export class ETodoItem {
    constructor(
        public readonly _id: entityIdType,
        public title: string,
        public description: string,
        public todoListId: Types.ObjectId,
        public priority: Priority
    ) { }
}