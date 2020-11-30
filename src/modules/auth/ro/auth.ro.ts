import { ApiProperty } from '@nestjs/swagger'

export class AuthRO {
  @ApiProperty()
  access_token: string
}
