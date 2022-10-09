import { FortyTwoUser } from './interfaces/42user.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus , NotAcceptableException} from '@nestjs/common';
import { JwtService }   from  '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Code } from 'typeorm';
import { generateSecret, verify } from '2fa-util';
import { authenticator } from 'otplib';
import { User } from '@prisma/client';


@Injectable({})
export class AuthService {

	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
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
	}
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
	
	async createFakeUsers() {
		const user: User = await (this.prisma.user.create({
			data: {
				name: 'Corentin',
				avatar: 'https://cdn.intra.42.fr/users/jandre.png',
				Description: 'Ceci est une simple description',
			}
		}))
		return user;
	}

	async recupFakeUsers() {
		const user = await (this.prisma.user.findUnique({
			where: {
			  name: 'test1',
			},
		}))
		console.log(user);
		return user;
	}
}
