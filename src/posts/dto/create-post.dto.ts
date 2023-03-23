import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Title" })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "RO" })
  ro: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Type of reform" })
  typeReform: string;

  @IsString()
  @ApiProperty({ example: "https://example.com/file.pdf" })
  fileUrl: string;

  @IsString()
  file: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Legal regulation" })
  legalRegulation: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Content" })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Number" })
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Type" })
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Status" })
  status: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform((value: TransformFnParams) => value.value === "true")
  @ApiProperty({ example: true })
  isVisible: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Reference" })
  reference: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: "611a55b6cb166f25ef4ec51a" })
  category: string;
}
