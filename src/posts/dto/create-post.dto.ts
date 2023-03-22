import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    ro: string;

    @IsNotEmpty()
    @IsString()
    typeReform: string;

    fileUrl: string;
    file: string;

    @IsNotEmpty()
    @IsString()
    legalRegulation: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsBoolean()
    @Transform((value: TransformFnParams) => value.value === 'true')
    isVisible: boolean;

    @IsNotEmpty()
    @IsString()
    reference: string;

    @IsNotEmpty()
    @IsMongoId()
    category: string;
}
