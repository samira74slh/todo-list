import { Types } from 'mongoose';

export class GetTodoItemByIdQuery {
  constructor(public readonly id: Types.ObjectId) { }
}