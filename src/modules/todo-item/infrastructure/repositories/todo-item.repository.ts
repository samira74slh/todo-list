import { IRepository } from "src/shared/interfaces/repository.interface";
import { TodoItem, TodoItemDocument } from '../database/todo-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, RootFilterQuery, Types } from "mongoose";

export class TodoItemRepository implements IRepository<TodoItem> {
    constructor(
        @InjectModel(TodoItem.name) private readonly todoItemRepository: Model<TodoItemDocument>
    ) { }

    async bulkCreate(todoItems: TodoItem[]): Promise<TodoItemDocument[]> {
        let newTodoItems = await this.todoItemRepository.insertMany(todoItems);
        await Promise.all(newTodoItems.map(async item => item.toObject()))
        return newTodoItems;
    }

    async findById(id: Types.ObjectId): Promise<TodoItemDocument | null> {
        return await this.todoItemRepository.findById(id);
    }

    async findAll(): Promise<TodoItem[]> {
        return await this.todoItemRepository.find().sort({ priority: -1 }).lean();
    }

    async find(filter: FilterQuery<TodoItem>): Promise<TodoItemDocument[]> {
        return await this.todoItemRepository.find(filter).sort({ priority: -1 }).lean();
    }

    async update(id: Types.ObjectId, todoItem: Partial<TodoItem>): Promise<TodoItemDocument> {
        let upTodoItem = await this.todoItemRepository.findByIdAndUpdate(id, todoItem, { new: true });
        return upTodoItem.toObject();
    }

    async delete(id: Types.ObjectId): Promise<void> {
        return await this.todoItemRepository.findByIdAndDelete(id);
    }

    async deleteMany(filter: RootFilterQuery<TodoItem>): Promise<any> {
        return await this.todoItemRepository.deleteMany(filter);
    }
}
