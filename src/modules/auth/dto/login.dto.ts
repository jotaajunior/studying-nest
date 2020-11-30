import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class LoginDTO {
  @IsString()
  @ApiProperty()
  public uid: string

  @MinLength(4)
  @ApiProperty()
  public password: string
}
