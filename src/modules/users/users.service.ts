import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import * as argon from 'argon2'

import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRo } from './ro/user.ro'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Check if the value already exists for the column
   *
   * @param columnName The column
   * @param value The value
   * @param caseInsensitive If the search must be case sensitive or not
   */
  private async isUnique(
    columnName: keyof User,
    value: string,
    caseInsensitive = true,
  ): Promise<boolean> {
    const result = await this.userRepository.findOne({
      [columnName]: caseInsensitive ? ILike(value) : value,
    })

    return !result
  }

  /**
   * Hash the password
   *
   * @param password The password
   */
  private async hashPassword(password: string) {
    return await argon.hash(password)
  }

  /**
   * Creates an User
   *
   * @param userData The user data
   */
  public async create(userData: CreateUserDto): Promise<UserRo> {
    const { email, username, password } = userData

    const isEmailUnique = await this.isUnique('email', email)
    if (!isEmailUnique) {
      throw new HttpException('E-mail must be an unique value.', 400)
    }

    const isUsernameUnique = await this.isUnique('username', username)
    if (!isUsernameUnique) {
      throw new HttpException('Username must be an unique value.', 400)
    }

    const hashedPassword = await this.hashPassword(password)

    const { id } = await this.userRepository.save({
      email,
      username,
      password: hashedPassword,
    })

    return {
      id,
      email,
      username,
    }
  }

  /**
   * Return all the Users
   */
  public findAll(): Promise<UserRo[]> {
    return this.userRepository.find()
  }

  /**
   * Return the user with the id
   *
   * @param id The id
   */
  public async findOne(id: number): Promise<UserRo> {
    const user = await this.userRepository.findOne(id)

    if (user) {
      return user
    } else {
      throw new HttpException(
        "Can't found the user with specified id",
        HttpStatus.NOT_FOUND,
      )
    }
  }

  /**
   * Updates User with provided data
   *
   * @param id The id
   * @param userData The user data
   */
  public async update(id: number, userData: UpdateUserDto): Promise<UserRo> {
    const user = (await this.findOne(id)) as User

    if (userData.password) {
      user.password = await this.hashPassword(userData.password)
    }

    if (userData.email !== user.email) {
      const isEmailUnique = await this.isUnique('email', userData.email)

      if (!isEmailUnique) {
        throw new HttpException('E-mail must be an unique value.', 400)
      }
    }

    if (userData.username !== user.username) {
      const isUsernameUnique = await this.isUnique(
        'username',
        userData.username,
      )

      if (!isUsernameUnique) {
        throw new HttpException('Username must be an unique value.', 400)
      }
    }

    await this.userRepository.update(user.id, user)

    return {
      id,
      username: user.username,
      email: user.email,
    }
  }

  /**
   * Removes User with the given id
   *
   * @param id The id
   */
  public async remove(id: number): Promise<UserRo> {
    const user = await this.findOne(id)

    await this.userRepository.delete(id)

    return user
  }
}
