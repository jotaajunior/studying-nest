import { IsEmail, IsString, Length, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  public email: string

  @IsString()
  @Length(4, 16)
  public username: string

  @IsString()
  @MinLength(6)
  public password: string
}
