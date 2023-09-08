import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import CreateNewsDto from './dto/createNews.dto'
import UpdateNewsDto from './dto/updateNews.dto'
import { News } from './news.entity'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>
  ) {}

  async findAll(): Promise<News[]> {
    const news = await this.newsRepository.find()
    return news
  }

  // create news
  async create(news: CreateNewsDto, user: User) {
    const newNews = await this.newsRepository.create({
      ...news,
      author: user,
    })
    await this.newsRepository.save(newNews)
    return newNews
  }

  // update news
  async update(
    newsId: string,
    updatedNews: UpdateNewsDto,
    user: User
  ): Promise<News | null> {
    // Find news by id
    const existingNews = await this.newsRepository.findOne({
      where: { id: newsId },
      relations: ['author'],
    })

    // Check if news exists
    if (!existingNews) {
      throw new NotFoundException(`News with ID ${newsId} not found`)
    }

    // Make sure the user is the author of the news
    if (existingNews.author.id !== user.id) {
      throw new UnauthorizedException(
        `The user does not have permission to modify this news article.`
      )
    }

    await this.newsRepository.update(newsId, updatedNews)

    return await this.newsRepository.findOne({ where: { id: newsId } })
  }

  async delete(newsId, user: User): Promise<void> {
    // Find news by id
    const existingNews = await this.newsRepository.findOne({
      where: { id: newsId },
      relations: ['author'],
    })

    if (!existingNews) {
      throw new NotFoundException(`News with ID ${newsId} not found`)
    }

    // Make sure the user is the author of the news
    if (existingNews.author.id !== user.id) {
      throw new UnauthorizedException(
        `The user does not have permission to modify this news article.`
      )
    }

    await this.newsRepository.remove(existingNews)
  }
}
