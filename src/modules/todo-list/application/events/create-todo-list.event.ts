import { IEvent } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { LocalTodoItemDto } from "../dto/todo-list.dto";

export class CreateTodoListEvent implements IEvent {
  constructor(
    public title: string,
    public userId: Types.ObjectId,
    public todoItems: LocalTodoItemDto[]
  ) { }
}