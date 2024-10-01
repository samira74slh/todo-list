import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../../infrastructure/database/user.schema";
import { FilterQuery, Model, Types } from "mongoose";
import { IRepository } from "src/shared/interfaces/repository.interface";


export class UserRepository implements IRepository<User> {
    constructor(
        @InjectModel(User.name) private readonly userRepository: Model<UserDocument>
    ) { }

    async create(user: User): Promise<UserDocument> {
        let newUser = await this.userRepository.create(user);
        return newUser.toObject();
    }

    async findOne(filter: FilterQuery<User>): Promise<UserDocument | null> {
        return await this.userRepository.findOne(filter).lean();
    }

    async findById(id: Types.ObjectId): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find().lean();
    }

    async update(id: Types.ObjectId, user: User): Promise<UserDocument> {
        let upUser = await this.userRepository.findByIdAndUpdate(id, user, { new: true });
        return upUser.toObject();
    }

    async delete(id: Types.ObjectId): Promise<void> {
        return await this.userRepository.findByIdAndDelete(id);
    }
}