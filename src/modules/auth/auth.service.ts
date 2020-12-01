import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { UsersService } from '../users/users.service'
import { UserRO } from '../users/ro/user.ro'
import { DecodedToken } from './interfaces/DecodedToken'

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
  public async verifyCredentials(
    uid: string,
    password: string,
  ): Promise<UserRO> {
    const {
      password: hashedPassword,
      ...user
    } = await this.usersService.findByUid(uid)

    if (user) {
      const isCorrect = await argon2.verify(hashedPassword, password)

      if (isCorrect) {
        return user
      }
    } else {
      throw new UnauthorizedException()
    }
  }

  /**
   * Generates the JWT for User
   */
  public async login(user: UserRO) {
    const payload: DecodedToken = {
      userId: user.id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  /**
   * Decodes the token
   *
   * @param token The token
   */
  public verifyToken(token: string): DecodedToken {
    try {
      const decodedToken = this.jwtService.verify(token)
      return decodedToken
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}
