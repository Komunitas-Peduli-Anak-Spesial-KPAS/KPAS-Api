import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  meta: string;

  image: any;

  @IsNotEmpty()
  body: string;

  // @IsNotEmpty()
  // category: string[];
}
