import { Types } from 'mongoose';
export class GetUserByIdQuery {
  constructor(public readonly id: Types.ObjectId) { }
}