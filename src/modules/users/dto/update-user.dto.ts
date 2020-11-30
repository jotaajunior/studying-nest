import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  public email: string

  @IsString()
  @Length(4, 16)
  @IsOptional()
  public username: string

  @IsString()
  @MinLength(6)
  @IsOptional()
  public password: string
}
