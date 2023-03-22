import { IsBoolean, IsDefined, IsMimeType, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, ValidationOptions } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    description: string;

    @IsOptional()
    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsBoolean()
    @Transform((value: TransformFnParams) => value.value === 'true')
    isVisible: boolean;


    @IsNotEmpty()
    @IsMongoId()
    view: string;

    // @IsDefined()
    // @IsMimeType({ mimetype: 'image/png' } as ValidationOptions)
    image: Express.Multer.File;
}
