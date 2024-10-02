import { Types } from 'mongoose';

export class GetTodoListByIdQuery {
  constructor(public readonly id: Types.ObjectId) { }
}