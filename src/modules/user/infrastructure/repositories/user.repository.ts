import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../infrastructure/database/user.schema";
import { Model } from "mongoose";
import { IRepository } from "src/shared/interfaces/repository.interface";


export class UserRepository implements IRepository<User> {
    constructor(
        @InjectModel('Todo') private readonly userRepository: Model<User>
    ) { }
    async create(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(id: string, user: User): Promise<User> {
        return await this.userRepository.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<void> {
        return await this.userRepository.findByIdAndDelete(id);
    }
}