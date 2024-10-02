import { IEvent } from "@nestjs/cqrs";
import { Types } from "mongoose";

export class DeleteTodoListEvent implements IEvent {
  constructor(
    public id: Types.ObjectId,
  ) { }
}