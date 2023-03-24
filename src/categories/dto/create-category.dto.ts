import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'El nombre de la categoría',
        maxLength: 50,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'La descripción de la categoría',
        maxLength: 300,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    description: string;

    @ApiProperty({
        description: 'La URL de la imagen de la categoría',
        required: false,
    })
    @IsOptional()
    @IsString()
    imageUrl: string;

    @ApiProperty({
        description: 'Indica si la categoría es visible',
        type: Boolean,
    })
    @IsNotEmpty()
    @IsBoolean()
    @Transform((value: TransformFnParams) => value.value === 'true')
    isVisible: boolean;

    @ApiProperty({
        description: 'El estado de la categoría',
    })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({
        description: 'El ID de la vista asociada a la categoría',
    })
    @IsNotEmpty()
    @IsMongoId()
    view: string;

    @ApiProperty({
        description: 'La imagen de la categoría',
        type: 'file',
        format: 'binary',
    })
    image: Express.Multer.File;
}
