import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ViewsModule } from './views/views.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './categories/category.schema';
import { PostsModule } from './posts/posts.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CommonsModule } from './commons/commons.module';
import { StaticController } from './static.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CategoriesModule,
    ViewsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: (() => {
          // console.log('MONGODB_URL', configService.get('MONGODB_URL'));
          return configService.get('MONGODB_URL');
        })(),
        dbName: configService.get('MONGODB_DB_NAME'),

      }),
      inject: [ConfigService],
    }),
    PostsModule,
    CommonsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, StaticController],
  providers: [AppService],
})
export class AppModule { }
