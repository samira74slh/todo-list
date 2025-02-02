import { FilterQuery, RootFilterQuery, Types, UpdateQuery } from 'mongoose';

export interface IRepository<T> {
    create?(entity: T): Promise<T>;
    bulkCreate?(entity: T[]): Promise<T[]>;
    findOne?(filter: FilterQuery<T>): Promise<T | null>;
    findById?(id: Types.ObjectId): Promise<T | null>;
    findAll?(): Promise<T[]>;
    find?(filter: FilterQuery<T>): Promise<T[]>;
    update?(id: Types.ObjectId, entity: UpdateQuery<T>): Promise<T>;
    delete?(id: Types.ObjectId): Promise<void>;
    deleteMany?(filter: RootFilterQuery<T>): Promise<void>;
}