import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'

import { UsersService } from '../users/users.service'
import { AuthenticationService } from './authentication.service'
import RegisterDto from './dto/register.dto'
import JwtAuthenticationGuard from './guards/jwt-authentication.guard'
import JwtRefreshGuard from './guards/jwt-refresh.guard'
import { LocalAuthenticationGuard } from './guards/local-authentication.guard'
import RequestWithUser from './requestWithUser.interface'

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id)
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id)

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id)

    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
    return user
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id)
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut()
    )
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(request.user.id)

    request.res.setHeader('Set-Cookie', accessTokenCookie)
    return request.user
  }
}
