import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../../user/infrastructure/database/user.schema';
import { TodoItem } from '../../../todo-item/infrastructure/database/todo-item.schema';

export type TodoListDocument = HydratedDocument<TodoList>;

@Schema({ versionKey: false, validateBeforeSave: true })
export class TodoList {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], ref: TodoItem.name })
    todoItems: Types.ObjectId[]
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);