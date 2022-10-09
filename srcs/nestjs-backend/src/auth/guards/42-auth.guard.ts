import { ExecutionContext, Injectable, Response ,Redirect} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../user/user.service';

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') {
	constructor(private readonly UserService: UserService) {
		super({

		});
	  }
	  
	  async canActivate(context: ExecutionContext): Promise<any> {
		const activate = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return request;
	  }

}

