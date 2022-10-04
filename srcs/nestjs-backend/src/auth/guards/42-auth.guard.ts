import { ExecutionContext, Injectable, Response ,Redirect} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../user/user.service';

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') {
	constructor(private readonly UserService: UserService) {
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
	  
	  async canActivate(context: ExecutionContext): Promise<any> {
		const activate = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		
		
		
		
		// if(request.username)
		// {
		// 	let fac = this.UserService.find2FA(request.username); 
		// 	if( await fac == 1 )
		// 	{
		// 		// let name = request.username;
		// 		// console.log("[]:",name);
		// 		// let id = (await this.UserService.findid(name)) ;
		// 		// let secret = (await this.UserService.findSecret(name) ) ;
		// 		// return
		// 		// let ppp = 
		// 		let phrase = '<form><div><label for="example">Veuillez saisir du texte</label><input id="example" type="text" name="text"></div><div><input type="submit" value="Envoyer"accesskey="s"></div></form>';
		// 		// console.log("*0000000000" , req.user.username ,"0000000000*");
		// 		return phrase;
		// 		// return Redirect("http://localhost:9876/verify",302);
		// 		// return null;
		// 		// if(ppp == 1) { return profile ;}
		// 		// else { return null; }
		// 		// if(this.authService.validateUser(userName, password))
		// 		// if (!user) {
		// 		//   throw new UnauthorizedException();
		// 		// }
		// 		// console.log("*-----------" , request.username ,"-----------*");
				
		// 		// return request.username;
		// 		// request.isUnauthenticated;
		// 		// 
		// 	}
		// 	if( await fac == 0 ) { return request;return null; }
		// }
		// return request;
		
		
		// const { id, username, photos } = request;
		// console.log("....>")
		
		// const foo = request.id
		// const fooh = request.username
		// const fooj = request.photos
		
		// console.log(foo)
		// console.log(fooh)
		// console.log(fooj)
		
		// console.log("<....")
		// console.log(activate)
		// saad(){}
		// request[0]
		return request;
		// return null;
	  }

}

