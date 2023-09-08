import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../../users/users.service'
import TokenPayload from '../tokenPayload.interface'

function findValuePath(obj, targetValue, currentPath = []) {
  for (const key in obj) {
    const value = obj[key]
    if (value === targetValue) {
      return [...currentPath, key]
    } else if (typeof value === 'object') {
      const path = findValuePath(value, targetValue, [...currentPath, key])
      if (path) {
        return path
      }
    }
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          debugger
          return request?.cookies?.Authentication
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    })
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId)
  }
}
