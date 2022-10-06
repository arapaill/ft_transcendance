import { Injectable, Put } from '@nestjs/common';
// import { User, Prisma } from '@prisma/client';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { Any } from 'typeorm';
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.prisma.user.update({
		where: {
			id: userId,
		  },
		  data: {
			achievements: secret
		  }	
		  
    });
  }
  
  async findBySaad( nameg: string) {
    let u =  this.prisma.user.findFirst({
		where: {
			name: nameg,
		  },
    });
	if((await u) != null){ return 1;}
    return 0;
    // if (u) {return "Yes";}else{return "No";}
  }
  
  async find2FA( nameg: string) {
    let u =  this.prisma.user.findFirst({
		where: {
			name: nameg,
			two_factor: true,
		  },
    });
	if((await u) != null){ return 1;}
    return 0;
    // if (u) {return "Yes";}else{return "No";}
  }
  
  
  
	async requestUserInfos(nameg: string) {
		let u =  this.prisma.user.findFirst({
			where: {
				name: nameg[0],
			},
		});

		return u;
  	}

	async requestUserInfosID(id: number) {
		let u =  this.prisma.user.findFirst({
			where: {
				id: id[0],
			},
		});

		return u;
  	}
  
  
  
/*  Objectif 2: faire une demande de match history sous forme de tableau de string*/

  
async requestUserMatchsHistory( nameg: string) {
    let u =  this.prisma.user.findFirst({
		where: {
			name: nameg,
		  },
    });
    let MatchsHistory  = (await u).MatchsHistory;

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
	let y = this.prisma.user.findFirst({
		where: {
			id: oneto,
		  },
    });
    let frd = (await y).name;
    if( frd != null){
		let u =  this.prisma.user.update({
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
	let u =  this.prisma.user.findFirst({
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
 async requestCheckUserName(nameg: string) {
    let u =  this.prisma.user.findFirst({
		where: {
			name: nameg[0],
		  },
    });

	if ((await u) != null)
		return true;
    return false;
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

async updateUser(userInfos: any) {
	console.log(userInfos);

	let userUpdated = this.prisma.user.update({
		where: {
			id: userInfos[0].id,
		  },
		  data: {
			name: userInfos[0].pseudo,
			avatar: userInfos[0].avatar,
			Description: userInfos[0].description
		  }
    });

	return userUpdated;
}
  
  async find_already_2FA( nameg: string) {
  
    let u =  this.prisma.user.findFirst({
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
  
    let u =  this.prisma.user.findFirst({
		where: {
			name: nameg,
			// secret: null,
		  },
    });
    return (await u).qrCode;
  }
  
  async findid( nameg: string) {
  
    let u =  this.prisma.user.findFirst({
		where: {
			name: nameg,
			// secret: null,
		  },
    });
    return (await u).id;
  }
  async findSecret( nameg: string) {
  
    let u =  this.prisma.user.findFirst({
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
}
