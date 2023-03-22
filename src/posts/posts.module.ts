import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'IPost', schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }
