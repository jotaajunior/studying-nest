import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRo } from './ro/user.ro'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOkResponse({
    description: 'The User has been successfully created',
    type: UserRo,
  })
  public create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOkResponse({
    description: 'Return all the Users',
    isArray: true,
    type: UserRo,
  })
  public getAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return the User with the specified id',
    isArray: true,
    type: UserRo,
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
    type: UserRo,
  })
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
    type: UserRo,
  })
  public remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usersService.remove(id)
  }
}
