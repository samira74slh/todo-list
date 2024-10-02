import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  HydratedDocument, Types } from "mongoose";
import { TodoList } from "src/modules/todo-list/infrastructure/database/todo-list.schema";

export type UserDocument = HydratedDocument<User>;
@Schema({ validateBeforeSave: true, versionKey: false })

export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [Types.ObjectId], ref: TodoList.name })
    todoLists: Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);