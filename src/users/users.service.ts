import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import CreateUserDto from './dto/createUser.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    })
    if (user) {
      return user
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND
    )
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (user) {
      return user
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    )
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData)
    await this.usersRepository.save(newUser)
    return newUser
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    })
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId)

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    )

    if (isRefreshTokenMatching) {
      return user
    }
  }

  async removeRefreshToken(userId: string) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    })
  }
}