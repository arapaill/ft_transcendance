import { Injectable , HttpException ,HttpStatus, Redirect } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VarifyCallback } from 'passport-42';
import { AuthService } from '../auth.service';
import { FortyTwoUser } from '../interfaces/42user.interface';
import { UserService } from '../../user/user.service';
import { request } from 'express';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,private readonly UserService: UserService) {
    super({
	//   authorizationURL:'https://api.intra.42.fr/oauth/authorize?client_id=9d926f48d4542381e8a36bccee5c8a39bc03686a97163437e65effc620dfd9a1&redirect_uri=http%3A%2F%2Flocalhost%3A9876%2Fauth2%2Fcode%2F&response_type=code',
	//   grant_type: 'authorization_code',
      clientID: '9d926f48d4542381e8a36bccee5c8a39bc03686a97163437e65effc620dfd9a1',
      clientSecret: 'b91fac0cfb65c4faa4714dd585045707c649e26f1149ca2afbb078f0d165b2bc',
      callbackURL: 'http://localhost:9876/auth2/code/',
    //   tokenURL: 'https://api.intra.42.fr/oauth/token',
	//   scope: 'public',
    //   proxy: true,
    });
  }

  async validate(   accessToken: string,   refreshToken: string,   profile: FortyTwoUser,   done: VarifyCallback,
  ) {
	// const { id, username, photos } = profile;
	const user = {
		id: profile.id,
		name: profile.username,
		photos: profile.photos,
	  };
	//   if (!profile) {
	// 	throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
	//   }
	//   if (!user) {
	// 	throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
	//   }
	// console.log("profile.id =  ")
    // console.log(profile.id)
    // if(profile.username)
    // {
    // 	let fac = this.UserService.find2FA(profile.username); 
	//     if( await fac == 1 )
	//     {
	// 	    let name = profile.username;
	// 	    console.log("[]:",name);
	// 		let id = (await this.UserService.findid(name)) ;
	// 		let secret = (await this.UserService.findSecret(name) ) ;
	// 		// return
	// 		return Redirect("http://localhost:9876/verify",302);
	// 		if(ppp == 1) { return profile ;}
	// 		else { return null; }
	// 		// if(this.authService.validateUser(userName, password))
	// 		// if (!user) {
	// 		//   throw new UnauthorizedException();
	// 		// }
	// 		console.log("*-----------" , profile.username ,"-----------*");
			
	// 		return profile.username;
	// 		// request.isUnauthenticated;
	// 		// 
	//     }
	    // if( await fac == 0 ) { 
	    return profile;
	//     }
    // }
	// return null;
//************** */
	// return user;
	
	// console.log("profile.displayName =  ")
    // console.log(profile.displayName)
    
	// console.log("profile.username =  ")
    // console.log(profile.photos)  
	
	// console.log("profile.photos =  ")
    // console.log(profile.photos)
    // return profile;
  }
}
