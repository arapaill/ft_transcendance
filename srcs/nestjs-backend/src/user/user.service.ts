import { Injectable, Put } from '@nestjs/common';
// import { User, Prisma } from '@prisma/client';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { Any } from 'typeorm';
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { userInfo } from 'os';
import { UserModule } from './user.module';
import { generateSecret, verify } from '2fa-util';
import { info } from 'console';

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
  
  
/*  Objectif 1                                                                    */
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

  
async requestUserMatchsHistory(userName: string) {
    let matchsHistory = await this.prisma.gameHistory.findMany({
		where: {
			 OR: [{
			 	JOUEUR_1: userName[0],
			 },
			 {
			 	JOUEUR_2: userName[0],
			 },]
		  },
    });

    return  matchsHistory;
 }

async requestAllUsers() {
	let users = await this.prisma.user.findMany();

	return users;
}


/*
 async requestUpdateFriendList(userID: number) {
    let ret = await this.prisma.user.findFirst({
		where: {
			friendsList: {
				has: userID,
			},
		  },
    });

	if (ret) {
		let index = ret.friendsList.indexOf(userID);
		ret.friendsList.splice(index, 1);
		await this.prisma.user.update({
			where: {
				
			}
		})
	}
 } */


  /*
Objectif 3: faire une demande des 5 meilleurs joueurs en fonction du nombres de victoirs sous forme de tableau d'objet User (voir objectif 1)


Demande: socket.emit("requestTopFiveUsers");
Réponse : socket.on(getTopFiveUsers");

Ce que je voudrais récupérer :

top : User[] (voir Objectif: 1)

status : À faire*/


async requestTopFiveUsers() {
	// console.log(userInfos);

	let top5 = this.prisma.user.findMany({
		take: 5 ,
		orderBy: {
			wins: 'desc' ,
		  },
    });

	return  top5;
  }
  
  
 
/* Objectif 9: Update la friendlist de l'user */
async updateFriendlist(infos: unknown) {
	let myUser = await this.prisma.user.findFirst({
		where: {
			id: infos[0].myID,
		}
	});

	let tmpfriendList: number[] = myUser.friendsList;
	let index = tmpfriendList.indexOf(infos[0].friendID);
	if (index != -1) {
		tmpfriendList.splice(index, 1);
	}
	else {
		tmpfriendList.push(infos[0].friendID);
	}

	await this.prisma.user.update({
		where: {
			id: infos[0].myID,
		},
		data: {
			friendsList: tmpfriendList,
		}
	});
 }

 async updateBlocklist(infos: unknown) {
	let myUser = await this.prisma.user.findFirst({
		where: {
			id: infos[0].myID,
		}
	});

	let tmpBlockList: number[] = myUser.blockList;
	let index = tmpBlockList.indexOf(infos[0].friendID);
	if (index != -1) {
		tmpBlockList.splice(index, 1);
	}
	else {
		tmpBlockList.push(infos[0].friendID);
	}

	await this.prisma.user.update({
		where: {
			id: infos[0].myID,
		},
		data: {
			blockList: tmpBlockList,
		}
	});

	let info = await this.prisma.user.findFirst({
		where: {
			id: infos[0].myID
		}
	})
 }


/* Objectif 10: Savoir si le user est en cours de partie ou non */
async requestIsUserPlaying(userID: number) {
	let u = await this.prisma.user.findFirst({
		where: {
			id: userID[0],
		  },
    });

	let status = u.match

    return status;
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

async requestUserWins(userID: number) {
	let userName = await this.prisma.user.findFirst({
		where: {
			id: userID[0],
		}
	});

	let wins = await this.prisma.gameHistory.findMany({
		where: {
			VAINQUEUR: userName.name,
		}
	});

	return wins.length;
}

async updateUser(userInfos: any) {
	let userUpdated = this.prisma.user.update({
		where: {
			id: userInfos[0].id,
		  },
		  data: {
			name: userInfos[0].pseudo,
			avatar: userInfos[0].avatar,
			Description: userInfos[0].description,
			friendsList: userInfos[0].friends,
			blockList: userInfos[0].blackList,
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
	
		// added new by saad night ---------------------------------------
		
		
		private secrets: Map<number, string> = new Map();
		async generateQR(username: string , userId: number){
	   
		   
		   const output = await generateSecret(username, 'PingPong');
		   this.secrets.set(userId, output.secret);
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
	   
	   
		   const check = await verify(code, secret);
		   if (!check) {return 0};
		   return 1;
	   
		 }
	   
		 async request2FA( idd: number) {
			   let id_num = idd;
			   var y: number = +id_num;
			   let id = y ;
			   let u =  await this.prisma.user.findFirst({
				   where: {
					   id: id,
					   // secret: null,
				   },
			   });
			   const p = this.generateQR(u.name , (await this.findid(u.name)));
			   // this.pipeQrCodeStream((await p).qrcode.toString(), "sejjed")
			   // const f = '<img src="' + (await p).qrcode.toFileStream.url() +'" /> ';
			   let codeQr = (await p).qrcode.toString();
			   let secretQr = (await p).secret;
			   const gf = await this.prisma.user.update({
				   where: {
					   name: u.name,
				   },
				   data: {
					   qrCode: codeQr,
					   secret: secretQr,
					   two_factor: true ,
				   }	
				   });
		   // return (await p).qrcode.toString();
		 }
		 
		 
		 async requestUN2FA( idd: number) {
		   let id_num = idd;
		   var y: number = +id_num;
		   let id = y ;
		   let u =  await this.prisma.user.findFirst({
			   where: {
				   id: id,
			   },
		   });
		   const gf = await this.prisma.user.update({
			   where: {
				   name: u.name,
			   },
			   data: {
				   qrCode: null,
				   secret: null,
				   two_factor: false ,
			   }	
			   });
		   }
		   
		   async requestChangeStatus( idd: number, statu: string) {
			   let id_num = idd;
			   var y: number = +id_num;
			   let id = y ;
			   let u =  await this.prisma.user.findFirst({
				   where: {
					   id: id,
				   },
			   });
			   const gf = await this.prisma.user.update({
				   where: {
					   name: u.name,
				   },
				   data: {
					   line_status: statu,
				   }	
				   });
			   }		
		
			   async requestQR( idd: number) {

				let id_num = idd;
				var y: number = +id_num;
				let id = y ;
				let u =  await this.prisma.user.findFirst({
					where: {
						id: id,
					},
				});
				return (await u).qrCode;
			  }
	//-------------------------------------------------------------
  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
