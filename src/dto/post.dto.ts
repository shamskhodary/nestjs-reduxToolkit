import { IsNotEmpty, isNotEmpty, IsString, MinLength } from 'class-validator';

export class postDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
  
  @IsString()
  image: string
}
