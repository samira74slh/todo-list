import { IRepository } from "../../../../shared/interfaces/repository.interface";
import { TodoList, TodoListDocument } from '../database/todo-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export class TodoListRepository implements IRepository<TodoList> {
    constructor(
        @InjectModel(TodoList.name) private readonly todoListRepository: Model<TodoListDocument>
    ) { }

    async create(todoList: TodoList): Promise<TodoListDocument> {
        let newTodoList = await this.todoListRepository.create(todoList);
        return newTodoList.toObject();
    }

    async findOne(filter: FilterQuery<TodoList>): Promise<TodoListDocument | null> {
        return await this.todoListRepository.findOne(filter).lean();
    }

    async findById(id: Types.ObjectId): Promise<TodoListDocument | null> {
        return await this.todoListRepository.findById(id);
    }

    async findAll(): Promise<TodoList[]> {
        return await this.todoListRepository.find().lean();
    }

    async find(filter: FilterQuery<TodoList>): Promise<TodoListDocument[]> {
        return await this.todoListRepository.find(filter)
            // .populate(TodoItem.name)
            .lean();
    }

    async update(id: Types.ObjectId, { todoItems, ...todoList }: UpdateQuery<TodoList>): Promise<TodoListDocument> {
        let filter: UpdateQuery<TodoList> = todoList;
        if (todoItems) {
            filter = {
                ...filter,
                $push: { todoItems: { $each: todoItems } }
            }
            let upTodoList = await this.todoListRepository.findByIdAndUpdate(id, filter, { new: true });
            return upTodoList.toObject();
        }
    }

    async delete(id: Types.ObjectId): Promise<void> {
        return await this.todoListRepository.findByIdAndDelete(id);
    }
}
