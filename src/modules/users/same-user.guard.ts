import { CanActivate, ExecutionContext } from '@nestjs/common'

import { UserRO } from './ro/user.ro'

export class SameUserGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user as UserRO

    if (request.params.id) {
      const targetId = Number(request.params.id)

      return targetId === user.id
    }

    return false
  }
}
