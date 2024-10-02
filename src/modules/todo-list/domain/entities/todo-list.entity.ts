import { entityIdType, idType } from "../../../../shared/types/id-type";
import { Types } from "mongoose";

export class ETodoList {
    constructor(
        public readonly _id: entityIdType,
        public title: string,
        public userId: Types.ObjectId,
        public todoItems: Types.ObjectId[]
    ) { }
}