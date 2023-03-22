import { IsBoolean, IsDefined, IsMimeType, IsNotEmpty, IsOptional, IsString, MaxLength, ValidationOptions } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateViewDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsBoolean()
    @Transform((value: TransformFnParams) => value.value === 'true')
    isVisible: boolean;

    // @IsDefined()
    // @IsMimeType({ mimetype: 'image/png' } as ValidationOptions)
    image: Express.Multer.File;
}
