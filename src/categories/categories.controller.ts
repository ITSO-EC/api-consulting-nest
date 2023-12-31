import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as fs from 'fs';
import { PaginationQueryDto } from 'src/commons/dto/pagination-query.dto';
import { PaginationResult } from 'src/commons/utils/paginate';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (image) {
      createCategoryDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
      await fs.promises.rename(image.path, 'uploads/' + createCategoryDto.imageUrl);

    }
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<Category>> {
    return this.categoryService.findAll(paginationQueryDto);
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
      await fs.promises.rename(image.path, 'uploads/' + updateCategoryDto.imageUrl);
    }
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
