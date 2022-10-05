// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as https from 'https';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/services/user.service';
// import { FortyTwoUser } from './interfaces/42user.interface';
// import { generateSecret, verify } from '2fa-util';
// import { Socket } from 'socket.io';
// import { ConnectionService } from 'src/user/services/connection.service';

import { FortyTwoUser } from './interfaces/42user.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus , NotAcceptableException} from '@nestjs/common';
// import { User } from '@prisma/client';
import { JwtService }   from  '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Code } from 'typeorm';
import { generateSecret, verify } from '2fa-util';
import { authenticator } from 'otplib';


@Injectable({})
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private  jwtService: JwtService,
		// private config: ConfigService,
	) {}
	private secrets: Map<number, string> = new Map();
	
	
	signup() {
		return { msg : 'I have signed up' };
	}
	
	signin() {
		return { msg : 'I have signed in' };
	}
	
	acess() {
		return 'acess' ;
	}
	
	error() {
		return 'error' ;
	}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async validateUser(username: string, password: string): Promise<any> {
	// const user = await this.usersService.getUser(username);
	// const passwordValid = await bcrypt.compare(password, user.password)
	// if (!user) {
	// 	throw new NotAcceptableException('could not find the user');
	//   }
	// if (user && passwordValid) {
	  return {
		password: password,
		userName: username
	  };
	// }
	// return null;
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 
	// public async generateTwoFactorAuthenticationSecret(email: string , id: number) {
	// 	const secret = authenticator.generateSecret();
	 
	// 	const otpauthUrl = authenticator.keyuri(email, "transcendence_Pong", secret);
	 
	// 	await this.userSer.setTwoFactorAuthenticationSecret(secret, id);
	 
	// 	return {
	// 	  secret,
	// 	  otpauthUrl
	// 	}
	//   }








	async generateQR(username: string , userId: number){
		// const connection = await this.connectionService.getConnection(
		//   { user: userId },
		//   ['user'],
		// );
		// if (connection.otp)
		//   throw new HttpException('Already setup', HttpStatus.FORBIDDEN);
	
		const output = await generateSecret(username, 'PingPong');
		this.secrets.set(userId, output.secret);
		console.log("->userId:" , userId ,"*-*output.secret: ", output.secret , "<-");
		// return output.qrcode;
		let secret = output.secret ;
		let qrcode = output.qrcode ;
		return {
			secret,
			qrcode 
		  }
	  }
	  
	  async verifyCode(
		userId: number,
		code: string,
		secret?: string,
	  ) {
		// if (!secret) {
		//   const connection = await this.connectionService.getConnection(
		// 	{ user: userId },
		// 	[],
		//   );
		//   secret = connection.otp;
		// }
	
		// if (!secret)
		//   throw new HttpException('No secret found', HttpStatus.NOT_FOUND);

		const check = await verify(code, secret);
		if (!check) {return 0};
		return 1;
		// throw new HttpException('Invalid code', HttpStatus.FORBIDDEN)  
		// return null;
		// if ((await check)) return "valide";
	  }
	  
	//   verifyJWT(token: string): any {
	// 	try {
	// 	  return this.jwtService.verify(token);
	// 	} catch {
	// 	  return null;
	// 	}
	//   }
	// signToken(code: string): Promise<string>{
		
	// 	grant_type:"authorization_code",
	// 	client_id:'9d926f48d4542381e8a36bccee5c8a39bc03686a97163437e65effc620dfd9a1',
	// 	client_secret:'4fc19ed17dbd743235d52953f0dee298f1dd65f74a23aaf0717e25b5225439e7',
	// 	code:code ,
	// 	redirect_uri:'http://localhost:9876/auth2/code/',
	// 	// -X POST https://api.intra.42.fr/oauth/token	
	
	
	
	// }
	
	// private createAccessToken(payload: JwtPayload): string {
	// 	const accessToken = this.jwtService.sign(payload, {
	// 	  expiresIn: this.configService.get<string>('ACCESS_TOEKN_TIME'),
	// 	  secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
	// 	});
	// 	return accessToken;
	//   }
	
	// async signToken(
	// 	code: string,
	//   ): Promise<{ access_token: string }> {
	// 	const payload = {
	// 	  sub:
	// 	  code,
	// 	//   FortyTwoStrategy,
	// 	};
	// 	// const secret = '4fc19ed17dbd743235d52953f0dee298f1dd65f74a23aaf0717e25b5225439e7';
	
	// 	const token = await this.jwt.sign(
	// 	  payload,
	// 	//   {
	// 	//     // grant_type: 'authorization_code',
	// 	// 	expiresIn: '7d',
	// 	// 	secret: secret,
	// 	//   },
	// 	);
	
	// 	return {
	// 	  access_token: token,
	// 	};
	//   }
	  
	//   verifyJWT(token: string): any {
	// 	try {
	// 	  return this.jwt.verify(token);
	// 	} catch {
	// 	  return null;
	// 	}
	//   }
	  
	//    createAccessToken(payload: FortyTwoUser,code: string): string {
	// 	const accessToken = this.jwt.sign(payload,code,);
	// 	return accessToken;
	//   }
}
