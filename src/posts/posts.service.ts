import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { IPost } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from 'src/commons/dto/pagination-query.dto';
import { PaginationResult, paginate } from 'src/commons/utils/paginate';

@Injectable()
export class PostsService {
  constructor(@InjectModel('IPost') private readonly postModel: PaginateModel<IPost>) { }

  async create(createPostDto: CreatePostDto): Promise<IPost> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<IPost>> {
    return paginate<IPost>(this.postModel, paginationQueryDto);
  }

  async findOne(id: string): Promise<IPost> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<IPost> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string): Promise<IPost> {
    return this.postModel.findByIdAndRemove(id);
  }
}
