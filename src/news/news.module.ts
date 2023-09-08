import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from '../users/users.module'
import { NewsController } from './news.controller'
import { News } from './news.entity'
import { NewsService } from './news.service'

@Module({
  imports: [TypeOrmModule.forFeature([News]), UsersModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
