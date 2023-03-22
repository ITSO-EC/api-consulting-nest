import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (image) {
      createCategoryDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
    }
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async update(@UploadedFile() image: Express.Multer.File, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    if (image) {
      updateCategoryDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
    }
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
