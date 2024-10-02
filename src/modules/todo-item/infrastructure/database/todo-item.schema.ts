import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from 'mongoose';
import { TodoList } from '../../../todo-list/infrastructure/database/todo-list.schema';
import { User } from "src/modules/user/infrastructure/database/user.schema";

export type TodoItemDocument = HydratedDocument<TodoItem>;

@Schema({ versionKey: false, validateBeforeSave: true })
export class TodoItem {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    priority: number;

    @Prop({ type: Types.ObjectId, ref: 'TodoList', required: true })
    todoListId: Types.ObjectId;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);