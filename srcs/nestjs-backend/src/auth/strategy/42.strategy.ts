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
