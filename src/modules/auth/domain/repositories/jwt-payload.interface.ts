import {  Types } from "mongoose";

export interface IJWTPayload {
    _id: string | Types.ObjectId;
    username: string;
}