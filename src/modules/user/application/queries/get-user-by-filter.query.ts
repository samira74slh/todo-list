import { Types } from "mongoose";
import { idType } from "../../../../shared/types/id-type";

export class GetUserByFilterQuery {
  constructor(
    public readonly _id?: idType,
    public readonly username?: string
  ) { }
}