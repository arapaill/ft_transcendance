
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}

// @Injectable()
// export default class JwtAuthGuard extends AuthGuard('passport-2fa-totp') {
//   constructor(private  reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext): any {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       return true;
//     }
//     return super.canActivate(context);
//   }
// }
