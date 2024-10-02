import { ObjectId, Types } from "mongoose";

export type idType = string | Types.ObjectId;
export type entityIdType = idType | null;
