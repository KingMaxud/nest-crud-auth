import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../users/user.entity'

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public title: string

  @Column()
  public content: string

  @ManyToOne(() => User, (user: User) => user.news)
  public author: User
}
