/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async GetAllArticle(): Promise<any> {
    return this.articleService.GetAllArticle();
  }

  @Get('/:id')
  GetOneByIdArticle(@Param('id') id: string): Promise<any> {
    return this.articleService.GetOneByIdArticle(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async CreateArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    return this.articleService.CreateArticle(createArticleDto, image);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async UpdateArticle(
    @Body() updateArticleDto: CreateArticleDto,
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<any> {
    return this.articleService.UpdateArticle(id, updateArticleDto, image);
  }

  @Delete('/:id')
  async DeleteArticle(@Param('id') id: string): Promise<any> {
    return this.articleService.DeleteArticle(id);
  }
}
