// permissions.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/decorator';
import { Permission, ROLE_PERMISSIONS } from '../enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!required || required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const user = req.user; // do JwtAuthGuard set

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    // required: user cần có ít nhất 1 trong số required
    return permissions.some((p) => required.includes(p));
  }
}
