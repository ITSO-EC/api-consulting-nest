import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ViewsService } from './views.service';
import { View } from './view.interface';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewService: ViewsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() createViewDto: CreateViewDto): Promise<View> {
    if (image) {
      createViewDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
      await fs.promises.rename(image.path, 'uploads/'+ createViewDto.imageUrl);
    }
    return this.viewService.create(createViewDto);
  }

  @Get()
  async findAll(): Promise<View[]> {
    return this.viewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<View> {
    return this.viewService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async update(@UploadedFile() image: Express.Multer.File, @Param('id') id: string, @Body() updateViewDto: UpdateViewDto): Promise<View> {
    if (image) {
      updateViewDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
      await fs.promises.rename(image.path, 'uploads/'+ updateViewDto.imageUrl);

    }
    return this.viewService.update(id, updateViewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<View> {
    return this.viewService.remove(id);
  }
}
