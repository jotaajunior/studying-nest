import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const { email, username } = userData

    const emailAlreadyExists = await this.userRepository.findOne({
      where: { email },
    })

    if (emailAlreadyExists) {
      throw new HttpException(
        'E-mail is already registered.',
        HttpStatus.BAD_REQUEST,
      )
    }

    const usernameAlreadyExists = await this.userRepository.findOne({
      where: {
        username: ILike(`%${username}%`),
      },
    })

    if (usernameAlreadyExists) {
      throw new HttpException(
        'Username is already registered.',
        HttpStatus.BAD_REQUEST,
      )
    }

    const user = this.userRepository.create(userData)

    return this.userRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id)

    if (user) {
      return user
    } else {
      throw new HttpException(
        "Can't found user with specified id",
        HttpStatus.NOT_FOUND,
      )
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }
}
