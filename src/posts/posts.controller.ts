import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto): Promise<IPost> {
    if (file) {
      createPostDto.fileUrl = `${Date.now()}${extname(file.originalname)}`;
    }
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(): Promise<IPost[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IPost> {
    return this.postService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<IPost> {
    if (file) {
      updatePostDto.fileUrl = `${Date.now()}${extname(file.originalname)}`;
    }
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IPost> {
    return this.postService.remove(id);
  }
}
