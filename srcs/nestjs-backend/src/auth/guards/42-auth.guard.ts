import { ExecutionContext, Injectable, Response ,Redirect} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../user/user.service';

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') {
	constructor(private readonly UserService: UserService) {
		super({
		//   authorizationURL:'https://api.intra.42.fr/oauth/authorize?client_id=9d926f48d4542381e8a36bccee5c8a39bc03686a97163437e65effc620dfd9a1&redirect_uri=http%3A%2F%2Flocalhost%3A9876%2Fauth2%2Fcode%2F&response_type=code',
		//   grant_type: 'authorization_code',
		  clientID: '31c1d954e5dda39c33ec58ebbbc0f76d9e4a2eb19264f199d752fb079aeb48b4',
		  clientSecret: '2adb6038a9d246fd31bedf11ca301e8864d8fc23809ac3fd7a0dbd114644f57f',
		  callbackURL: 'http://localhost:3000/auth2/code/',
		//   tokenURL: 'https://api.intra.42.fr/oauth/token',
		//   scope: 'public',
		//   proxy: true,
		});
	  }
	  
	  async canActivate(context: ExecutionContext): Promise<any> {
		const activate = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return request;
	  }

}

