import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { PaginateModel } from 'mongoose';
import { PaginationQueryDto } from 'src/commons/dto/pagination-query.dto';
import { PaginationResult, paginate } from 'src/commons/utils/paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginationResult<User>> {
    return paginate<User>(this.userModel, paginationQueryDto);
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }

  async findByParams(params: any): Promise<User> {
    const foundUser = await this.userModel.findOne(params).exec();
    if (!foundUser) {
      throw new NotFoundException(`User with params ${params} not found`);
    }
    return foundUser;
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return deletedUser;
  }
}
