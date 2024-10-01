import { Types } from "mongoose";

export class GetUserByFilterQuery {
  constructor(
    public readonly _id?: string | Types.ObjectId,
    public readonly username?: string
  ) { }
}