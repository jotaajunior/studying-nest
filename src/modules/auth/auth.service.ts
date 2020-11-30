import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { UsersService } from '../users/users.service'
import { LoginDTO } from './dto/login.dto'
import { User } from '../users/user.entity'
import { AuthRO } from './ro/auth.ro'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Verify if the credentials are correct
   *
   * @param uid E-mail or username
   * @param password The password
   */
  private async verifyCredentials(
    uid: string,
    password: string,
  ): Promise<User | false> {
    const user = await this.usersService.findByUid(uid)

    if (user) {
      const isCorrect = await argon2.verify(user.password, password)
      return isCorrect ? user : false
    } else {
      return false
    }
  }

  /**
   * Generates the JWT for User
   */
  private async generateJwt(user: User) {
    const payload = {
      id: user.id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  /**
   * Attempts to authenticate the user
   *
   * @param loginData The login data
   * @param loginData.uid E-mail or username
   * @param loginData.password The password
   */
  public async authenticate({ uid, password }: LoginDTO): Promise<AuthRO> {
    const user = await this.verifyCredentials(uid, password)

    if (user) {
      return this.generateJwt(user)
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN)
    }
  }
}
