// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
// //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //       ignoreExpiration: false,
//     //   secretOrKey: '49d926f48d4542381e8a36bccee5c8a39bc03686a97163437e65effc620dfd9a1',
//       secret: '0',
//     });
//   }

// //   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
//   validate(payload: any): any {
//     if (!payload)
//       throw new HttpException('Need OTP validation', HttpStatus.FORBIDDEN);
//     return { userId: payload };
//   }
// }
