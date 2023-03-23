import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { Category } from './category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from 'src/commons/dto/pagination-query.dto';
import { PaginationResult, paginate } from 'src/commons/utils/paginate';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: PaginateModel<Category>) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<Category>> {
    return paginate<Category>(this.categoryModel, paginationQueryDto);
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
  }

  async remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
