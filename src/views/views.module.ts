import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewSchema } from './view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'View', schema: ViewSchema }]),
  ],
  controllers: [ViewsController],
  providers: [ViewsService]
})
export class ViewsModule { }
