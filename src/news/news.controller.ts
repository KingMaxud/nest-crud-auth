import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'

import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard'
import RequestWithUser from '../authentication/requestWithUser.interface'
import CreateNewsDto from './dto/createNews.dto'
import UpdateNewsDto from './dto/updateNews.dto'
import { News } from './news.entity'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(): Promise<News[]> {
    return await this.newsService.findAll()
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createNews(
    @Body() news: CreateNewsDto,
    @Req() req: RequestWithUser
  ): Promise<News> {
    const user = req.user
    return await this.newsService.create(news, user)
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async update(
    @Param('id') id: string,
    @Body() updatedNews: UpdateNewsDto,
    @Req() req: RequestWithUser
  ) {
    const user = req.user
    return await this.newsService.update(id, updatedNews, user)
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    const user = req.user
    return await this.newsService.delete(id, user)
  }
}
