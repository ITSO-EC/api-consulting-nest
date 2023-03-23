import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

   
@ApiTags('PaginationQueryDto')
export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ example: 1, description: 'Page number', required: false })
    page?: number;
  
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ example: 10, description: 'Number of items per page', required: false })
    limit?: number;
  
    @IsOptional()
    @ApiProperty({ example: '{"name":"John"}', description: 'Filter criteria', required: false })
    filter?: string;
  
    @IsOptional()
    @ApiProperty({ example: '{"createdAt":"desc"}', description: 'Sort criteria', required: false })
    sort?: string;
  
    @IsOptional()
    @ApiProperty({ example: 'author', description: 'Populate related documents', required: false })
    populate?: string;
  }
  