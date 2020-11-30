import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
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
  public async authenticate(
    @Body()
    loginData: LoginDTO,
  ): Promise<AuthRO> {
    return this.authService.authenticate(loginData)
  }
}
