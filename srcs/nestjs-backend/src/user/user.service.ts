import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { User, Prisma } from '@prisma/client';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { Any } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private PrismaService: PrismaService) {}
  
  
  
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.PrismaService.user.update({
		where: {
			id: userId,
		  },
		  data: {
			achievements: secret
		  }	
		  
    });
  }
  
  async findBySaad( nameg: string) {
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
		  },
    });
	if((await u) != null){ return 1;}
    return 0;
    // if (u) {return "Yes";}else{return "No";}
  }
  
  async find2FA( nameg: string) {
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
			two_factor: true,
		  },
    });
	if((await u) != null){ return 1;}
    return 0;
    // if (u) {return "Yes";}else{return "No";}
  }
  
  async find_already_2FA( nameg: string) {
  
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
			secret: null,
			qrCode: null,
		  },
    });

    if ((await u) != null )  {return 1;}
    return 0;
    // if (u) {return "Yes";}else{return "No";}
  }
  
  async findQrcode( nameg: string) {
  
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
			// secret: null,
		  },
    });
    return (await u).qrCode;
  }
  
  async findid( nameg: string) {
  
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
			// secret: null,
		  },
    });
    return (await u).id;
  }
  async findSecret( nameg: string) {
  
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
			// secret: null,
		  },
    });
    return (await u).secret;
  }
  
	public async generateTwoFactorAuthenticationSecret(email: string , id: number) {
		const secret = authenticator.generateSecret();
	 
		const otpauthUrl = authenticator.keyuri(email, "transcendence_Pong", secret);
	 
		await this.setTwoFactorAuthenticationSecret(secret, id);
	 
		return {
		  secret,
		  otpauthUrl
		}
	}
  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
  
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
  
  
  
  
  
  
  
//   async getAllUser(): Promise<User[]> {
//     return this.prisma.user.findMany();
//   }
//   async getUser(id: number): Promise<User | null> {
//     return this.prisma.user.findUnique({ where: { id: Number(id) } });
//   }
//   async createUser(
// 	id   :          number ,
// 	name    :       String,
// 	Full_Nam   :   String,
// 	two_factor  :   Boolean ,
// 	avatar       :  String,
// 	line_status :   String,
// 	wins         :  number,
// 	losses       :  number,
// 	ladder_level :  number,
// 	achievements  : String,
// 	friends       : String,
//   ): Promise<User> {
//     return this.prisma.user.create({
//       data: { 
// 		id   :          id ,
// 		name    :       name,
// 		Full_Name   :   Full_Nam,
// 		two_factor  :   false ,
// 		avatar       :  String,
// 		line_status :   String,
// 		wins         :  number,
// 		losses       :  number,
// 		ladder_level :  number,
// 		achievements  : String,
// 		friends       : String,
//       },
//     });
//    }
//    async updateUser(  
//    id   :          number ,
// 	name    :       String,
// 	Full_Name   :   String,
// 	two_factor  :   Boolean ,
// 	avatar       :  String,
// 	line_status :   String,
// 	wins         :  number,
// 	losses       :  number,
// 	ladder_level :  number,
// 	achievements  : String,
// 	friends       : String,
// 	): Promise<User> {
//     return this.prisma.user.update({
//       where: { name: name },
//       data: { two_factor: true , avatar: "fdg",Full_Name: "Full_Name"},
//     });
//   }
//   async deleteUser(id: number): Promise<User> {
//     return this.prisma.user.delete({
//       where: { id: Number(id) },
//     });
//   }


}
