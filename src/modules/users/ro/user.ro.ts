import { ApiProperty } from '@nestjs/swagger'

export class UserRO {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string
}
