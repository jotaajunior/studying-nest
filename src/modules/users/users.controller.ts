import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRO } from './ro/user.ro'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { SameUserGuard } from './same-user.guard'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOkResponse({
    description: 'The User has been successfully created',
    type: UserRO,
  })
  public create(
    @Body()
    CreateUserDTO: CreateUserDTO,
  ) {
    return this.usersService.create(CreateUserDTO)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all the Users',
    isArray: true,
    type: UserRO,
  })
  public getAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the User with the specified id',
    isArray: true,
    type: UserRO,
  })
  public findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The User has been successfully updated',
    type: UserRO,
  })
  @UseGuards(JwtAuthGuard, SameUserGuard)
  public update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The User has been successfully removed',
    type: UserRO,
  })
  @UseGuards(JwtAuthGuard, SameUserGuard)
  public remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usersService.remove(id)
  }
}
