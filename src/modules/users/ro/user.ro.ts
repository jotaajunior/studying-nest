import { ApiProperty } from '@nestjs/swagger'

export class UserRo {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string
}
