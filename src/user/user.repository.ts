import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';


@Injectable()
export class UserRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User>|null {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilterQuery);
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User>,userPayload: Partial<any>): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, userPayload);
  }

  async findOneAndDelete(userFilterQuery: FilterQuery<User>) {
    return this.userModel.findOneAndDelete(userFilterQuery);
  }

}
