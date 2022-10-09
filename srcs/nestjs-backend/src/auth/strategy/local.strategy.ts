// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// // import { AuthenticationService } from '../authentication.service';
// // import { User } from '../../users/user.entity';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authenticationService: AuthenticationService) {
//     super({
//       usernameField: 'email',
//       passwordField: 'password',
//     });
//   }

//   async validate(email: string, password: string): Promise<Partial<User>> {
//     const userWithoutPsw = await this.authenticationService.validateUser(email, password);
//     if (!userWithoutPsw) {
//       throw new UnauthorizedException();
//     }
//     return userWithoutPsw;
//   }
// }

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// // const Strategy = require('passport-local');
// // import { Strategy } from 'passport-local';
// import { retry } from 'rxjs';
// import { AuthService } from '../auth.service';
// import { UserService } from 'src/user/user.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService,private readonly UserService: UserService,) {
// 	super();
//   }
//   async validate(code: string, name: string): Promise<any> {
	
	
// 	// let name = req.user.username;
// 		let id = (await this.UserService.findid(name)) ;
// 		let secret = (await this.UserService.findSecret(name) ) ;
// 	let f = (await this.authService.verifyCode(id,code,secret));
// 	if ((await f) == 1){return "ok"}
// 	if ((await f) == 0){
// 	return " \n \n False code try again";
// 	// return null;
	
// 	// response.send(phrase);			
// 	}
	
	
// 	// const userName = username.toLowerCase();
// 	// const user = await this.authService.validateUser(userName, password);
// 	// if (!user) {
// 	//   throw new UnauthorizedException();
// 	// }
// 	// return user;
	
//   }
// }
