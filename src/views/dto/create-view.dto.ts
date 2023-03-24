import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsMimeType, IsNotEmpty, IsOptional, IsString, MaxLength, ValidationOptions } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateViewDto {
    @ApiProperty({
        description: 'The name of the view.',
        maxLength: 50,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'The URL of the view image.',
        required: false,
    })
    @IsOptional()
    @IsString()
    imageUrl: string;

    @ApiProperty({
        description: 'Whether the view should be visible or not.',
    })
    @IsNotEmpty()
    @IsBoolean()
    @Transform((value: TransformFnParams) => value.value === 'true')
    isVisible: boolean;

    @ApiProperty({
        description: 'The image file to upload.',
        type: 'file',
        format: 'binary',
    })
    image: Express.Multer.File;
}
