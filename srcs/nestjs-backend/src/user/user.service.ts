import { Injectable, Put } from '@nestjs/common';
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
  
  
  
  async requestUserInfos( nameg: string) {
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
		  },
    });
    let id = (await u).id;
    let Name = (await u).name;
    // let avatar = (await u).avatar;
    // let Description = (await u).Description;
    // let date = (await u).Date;
    // let victoires = (await u).wins;
    // let match = (await u).match;
    return {
		id,Name,
		// avatar,Description, date, victoires ,match
    }
  }
  
  
  
/*  Objectif 2: faire une demande de match history sous forme de tableau de string*/

  
async requestUserMatchsHistory( nameg: string) {
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
		  },
    });
    let MatchsHistory ;
    // = (await u).MatchsHistory;

    return MatchsHistory;
 }

  /*
Objectif 3: faire une demande des 5 meilleurs joueurs en fonction du nombres de victoirs sous forme de tableau d'objet User (voir objectif 1)


Demande: socket.emit("requestTopFiveUsers");
Réponse : socket.on(getTopFiveUsers");

Ce que je voudrais récupérer :

top : User[] (voir Objectif: 1)

status : À faire*/


 
/* Objectif 9: Update la friendlist de l'user */

async updateFriendlist( nameg: string, oneto: number) {
	let y = this.PrismaService.user.findFirst({
		where: {
			id: oneto,
		  },
    });
    let frd = (await y).name;
    if( frd != null){
		let u =  this.PrismaService.user.update({
			where: {
				name: nameg,
			  },
			  data:{
			    friends:{
					push: frd,
			    } 
			  }
	    });    
    }

 }


/* Objectif 10: Savoir si le user est en cours de partie ou non */

async requestIsUserPlaying( nameg: string) {
	let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
		  },
    });
	let status = (await u).line_status
	if(status == "in game")
	{
		return true;
	}
    return false;
 }

  
/*Objectif 11: Faire une demande de login.

Réponse : socket.on("getLogin");

Ce que je voudrais récupérer :
	recevoir une confirmation de login + un objet du User

status : À faire*/
  
  
  
  

/*Objectif 12: Check si un pseudo existe deja.*/



 async requestCheckUserName( nameg: string) {
    let u =  this.PrismaService.user.findFirst({
		where: {
			name: nameg,
		  },
    });
	if((await u) != null){ return true;}
    return false;
    // if (u) {return "Yes";}else{return "No";}
  }
  
/*Objectif 13: Inviter un joueur à jouer au pong

Demande: socket.emit("inviteUserToPlay", userID);
Réponse: socket.on("getUserToPlay");

Ce que j'envoie: L'id (number) de l'user.
Ce que je voudrais recevoir: 
Alors ici c'est un peu plus complexe. Il faudrait envoyer
sur le socket de l'userID envoyé un simple boolean true.
Il faut donc trouver le socket de l'user dont l'id est userID.
Ca risque d'être un peu compliqué donc on pourra en discuter. 

status : À faire*/
  
  
  
  
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
