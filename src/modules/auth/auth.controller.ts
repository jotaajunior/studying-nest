import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserRO } from '../users/ro/user.ro'

import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthRO } from './ro/auth.ro'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post()
  @ApiOkResponse({
    description: 'Token has been successfully generated',
    type: AuthRO,
  })
  @UseGuards(LocalAuthGuard)
  public async authenticate(@Request() req: any): Promise<AuthRO> {
    return this.authService.login(req.user)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public getMe(@Request() req): UserRO {
    return req.user
  }
}
