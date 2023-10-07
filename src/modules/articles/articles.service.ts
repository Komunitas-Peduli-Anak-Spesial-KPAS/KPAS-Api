/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponseInterface } from 'src/interfaces/response.interface';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async GetAllArticle(): Promise<any> {
    const dataArticle = await this.prisma.article.findMany({
      include: {
        category: true,
      },
    });

    const response: ResponseInterface = {
      status: 200,
      message: 'Success to add article',
      data: dataArticle,
    };

    return response;
  }

  async GetOneByIdArticle(id: string): Promise<any> {
    const dataArticle = await this.prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
      },
    });

    const response: ResponseInterface = {
      status: 200,
      message: 'Success to add article',
      data: dataArticle,
    };

    return response;
  }

  async CreateArticle(createArticleDto: any, image: any): Promise<any> {
    if (image == undefined) {
      const response: ResponseInterface = {
        status: 400,
        message: 'Image is required',
        data: undefined,
      };

      return response;
    }

    var filename = `${uuidv4()}.jpg`;
    // save image to folder public/articles
    fs.writeFileSync(`./public/images/articles/${filename}`, image.buffer);

    createArticleDto.slug = createArticleDto.title
      .toLowerCase()
      .replace(/ /g, '-');

    const data = await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        slug: createArticleDto.slug,
        body: createArticleDto.body,
        meta: createArticleDto.meta,
        image: `public/images/articles/${filename}`,
        category: {
          connect: {
            id: parseInt(createArticleDto.category),
          },
        },
      },
    });

    const response: ResponseInterface = {
      status: 200,
      message: 'Success to add article',
      data,
    };

    return response;
  }

  async UpdateArticle(
    id: string,
    updateArticleDto: any,
    image: any,
  ): Promise<any> {
    // remove image and update image from directory article
    if (image) {
      const dataArticle = await this.prisma.article.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      fs.unlinkSync(`./public/images/articles/${dataArticle.image}`);

      var filename = `${uuidv4()}.jpg`;
      // save image to folder public/articles
      fs.writeFileSync(`./public/images/articles/${filename}`, image.buffer);
    }

    // slug
    updateArticleDto.slug = updateArticleDto.title
      .toLowerCase()
      .replace(/ /g, '-');

    const data = await this.prisma.article.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: updateArticleDto.title,
        slug: updateArticleDto.slug,
        body: updateArticleDto.body,
        meta: updateArticleDto.meta,
        image: filename,
        category: {
          connect: {
            id: parseInt(updateArticleDto.category),
          },
        },
      },
    });

    const response: ResponseInterface = {
      status: 200,
      message: 'Success to update article',
      data,
    };

    return response;
  }

  async DeleteArticle(id: string): Promise<any> {
    // delete by id

    const dataArticle = await this.prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!dataArticle) {
      const response: ResponseInterface = {
        status: 404,
        message: 'Data not found',
        data: undefined,
      };

      return response;
    }

    await this.prisma.article.delete({
      where: {
        id: parseInt(id),
      },
    });

    fs.unlinkSync(dataArticle.image);

    const response: ResponseInterface = {
      status: 200,
      message: 'Success to delete article',
      data: dataArticle,
    };

    return response;
  }
}
