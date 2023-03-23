import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ViewsService } from './views.service';
import { View } from './view.interface';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as fs from 'fs';
import { PaginationQueryDto } from 'src/commons/dto/pagination-query.dto';
import { PaginationResult } from 'src/commons/utils/paginate';
import { ApiTags, ApiOperation, ApiResponse, ApiExtraModels } from '@nestjs/swagger';


@ApiExtraModels(PaginationQueryDto)
@Controller('Views')
@ApiTags('views')
export class ViewsController {
  constructor(private readonly viewService: ViewsService) { }

  @Post()
  @ApiOperation({ summary: 'Create view' })
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(@UploadedFile() image: Express.Multer.File, @Body() createViewDto: CreateViewDto): Promise<View> {
    if (image) {
      createViewDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
      await fs.promises.rename(image.path, 'uploads/' + createViewDto.imageUrl);
    }
    return this.viewService.create(createViewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all views' })
  async findAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<PaginationResult<View>> {
    return this.viewService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find view by ID' })
  @ApiResponse({ status: 200, description: 'Returns the view with the specified ID.', type: "View" })
  async findOne(@Param('id') id: string): Promise<View> {
    return this.viewService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update view' })
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async update(@UploadedFile() image: Express.Multer.File, @Param('id') id: string, @Body() updateViewDto: UpdateViewDto): Promise<View> {
    if (image) {
      updateViewDto.imageUrl = `${Date.now()}${extname(image.originalname)}`;
      await fs.promises.rename(image.path, 'uploads/' + updateViewDto.imageUrl);

    }
    return this.viewService.update(id, updateViewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete view' })
  async remove(@Param('id') id: string): Promise<View> {
    return this.viewService.remove(id);
  }
}
