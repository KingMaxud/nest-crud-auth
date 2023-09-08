import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateNewsDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  content?: string
}

export default UpdateNewsDto
