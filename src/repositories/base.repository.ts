import { Document, FilterQuery, Model, model } from 'mongoose';


export default class BaseRepository<T extends Document, M extends Model<T>> {
    readonly DBModel: M = {} as M;

    constructor(readonly modelName: string, modelType: M) {
        this.DBModel = model<T, M>(modelName, modelType.schema);
    }

    readonly getAll = async (conditions: FilterQuery<T>) => {
        return this.DBModel.find(conditions);
    };

    readonly create = async (data: T) => {
        return this.DBModel.create(data);
    };

    readonly findOne = async (conditions: FilterQuery<T>) => {
        return this.DBModel.findOne(conditions);
    };

    readonly findById = async (id: string) => {
        return this.DBModel.findById(id);
    };

    readonly insertMany = async (data: T[], ordered: boolean = false) => {
        await this.DBModel.insertMany(data, { ordered: ordered });
    };
}
