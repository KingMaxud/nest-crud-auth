import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

import { News } from '../news/news.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column({ unique: true })
  public email: string

  @Exclude()
  @Column()
  public password: string

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string

  @OneToMany(() => News, (news) => news.author)
  public news: News[]
}
