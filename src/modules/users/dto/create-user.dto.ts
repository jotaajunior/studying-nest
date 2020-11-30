import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  @ApiProperty()
  public email: string

  @IsString()
  @Length(4, 16)
  @ApiProperty()
  public username: string

  @IsString()
  @MinLength(6)
  @ApiProperty()
  public password: string
}
