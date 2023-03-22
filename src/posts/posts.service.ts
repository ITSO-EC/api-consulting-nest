import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPost } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('IPost') private readonly postModel: Model<IPost>) { }

  async create(createPostDto: CreatePostDto): Promise<IPost> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<IPost[]> {
    return this.postModel.find().exec();
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
