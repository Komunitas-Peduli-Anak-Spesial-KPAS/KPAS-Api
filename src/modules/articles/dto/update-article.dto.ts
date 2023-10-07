import { IsNotEmpty } from 'class-validator';

export class UpdateArticleDto {
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
