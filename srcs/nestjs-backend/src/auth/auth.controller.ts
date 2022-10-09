import { Body, Controller, Get, Post , Delete, Redirect, Req , Request,Param, Headers, Query ,Res, HttpCode , UseGuards
	, ExceptionFilter,UseFilters , ExecutionContext ,RawBodyRequest, HttpStatus,} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthDto } from './dto';
import { request, Response} from 'express';
// import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { FortyTwoAuthGuard } from './guards/42-auth.guard';
// import { Public } from './decorators/public.decorator';
import { FortyTwoUser } from './interfaces/42user.interface';
import { read } from 'fs';
//import { HttpExceptionFilter } from './ http-exception.filter';
// import { Strategy } from 'passport-local';
import { FortyTwoStrategy } from './strategy/42.strategy';
import { deepStrictEqual } from 'assert';
import * as rawbody from 'raw-body';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { Buffer } from 'buffer';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
// import { WebSocketServer,  	WebSocketGateway,} from '@nestjs/websockets';
import { ConnectableObservable } from 'rxjs';
// let global  = "sejjed";


var export_name = null;
@Controller('auth2')
export class AuthController {

	constructor(
	private readonly prismaService: PrismaService,
	private authService: AuthService,
	private readonly UserService: UserService,
		) {}


	// @UseGuards(AuthenticatedGuard)


	@Get('111')
	async controllerCreateFakeUsef() {
		return await this.UserService.requestTopFiveUsers();
	}

	@Get('recupFakeUser')
	controllerRecupFakeUsef() {
		console.log("recupFakeUsers called !");
		this.authService.recupFakeUsers();
	}


	@Get('testit')
	async hhh(@Req() req,        @Body() {
		id, name,
	    Full_Name, two_factor, avatar, line_status,
	    wins, losses, ladder_level, achievements, 
	    
	    secret,email,qrCode,friends,demFriends,
		
		Description,MatchsHistory,match ,
		toUse,toUses, }: UserDto,){
		
			two_factor == null;
			line_status == null;
			wins == 5;
			losses == null; 
			ladder_level == null; 
			achievements == null; 	
			secret == null;
			email == null;
			qrCode == null;
			friends == null;
			demFriends == null;
			match == null;
			toUse == null ;
			toUses== null;
			
			
		let a1 = await this.prismaService.user.create({
			data : { 
				id: 1,
				name: "test1",
				avatar: "https://cdn.intra.42.fr/users/jandre.png",
				Description: "tester ici la description du test 1",
				MatchsHistory: [ "2 - 0","6 - 9","5 - 1"],
				wins: 5,
			}
		});
		
		
		id = 2 ;
		name = "test2";
		avatar = "https://cdn.intra.42.fr/users/arapaill.png";
		Description = "tester ici la description du test 2";
		let hgh = "0 - 0";
		let a2 = await this.prismaService.user.create({
			data : { 
				id,
				name,
				avatar,
				Description,
				MatchsHistory: ["6 - 5","4 - 6","11 - 7"],
				wins: 1,
			}
		});
		
		
		
		id = 3 ;
		name = "test3";
		avatar = "https://cdn.intra.42.fr/users/cgoncalv.png";
		Description = "tester ici la description du test 3";	
		let a3 = await this.prismaService.user.create({
			data : { 
				id,
				name,
				avatar,
				Description,
				MatchsHistory: [ "1 - 9","6 - 6","8 - 0"],
				wins: 0,
			}
		});
		
		id = 4 ;
		name = "test4";
		avatar = "https://cdn.intra.42.fr/users/cgoncalv.png";
		Description = "tester ici la description du test 3";	
		let a4 = await this.prismaService.user.create({
			data : { 
				id,
				name,
				avatar,
				Description,
				MatchsHistory: [ "1 - 9","6 - 6","8 - 0"],
				wins: 5785,
			}
		});
		
		id = 5 ;
		name = "test5";
		avatar = "https://cdn.intra.42.fr/users/cgoncalv.png";
		Description = "tester ici la description du test 3";	
		let a5 = await this.prismaService.user.create({
			data : { 
				id,
				name,
				avatar,
				Description,
				MatchsHistory: [ "1 - 9","6 - 6","8 - 0"],
				wins: 0,
			}
		});
		
		
		id = 6 ;
		name = "test6";
		avatar = "https://cdn.intra.42.fr/users/cgoncalv.png";
		Description = "tester ici la description du test 3";	
		let a6 = await this.prismaService.user.create({
			data : { 
				id,
				name,
				avatar,
				Description,
				MatchsHistory: [ "1 - 9","6 - 6","8 - 0"],
				wins: 105,
			}
		});
		
		id = 7 ;
		name = "test7";
		avatar = "https://cdn.intra.42.fr/users/cgoncalv.png";
		Description = "tester ici la description du test 3";	
		let a7 = await this.prismaService.user.create({
			data : { 
				id,
				name,
				avatar,
				Description,
				MatchsHistory: [ "1 - 9","6 - 6","8 - 0"],
				wins: 105,
			}
		});
		
		
		
		return {a1,a2,a3,a4,a5,a6,a7};

	}
	
	
	@Get('code')
	@UseGuards(FortyTwoAuthGuard)
     async getHello(
        @Request() req,
        @Body() {id, name,
	    Full_Name, two_factor, avatar, line_status,
	    wins, losses, ladder_level, achievements, 
	    
	    secret,email,qrCode,friends,demFriends,
		
		Description,MatchsHistory,match ,
		toUse,toUses, }: UserDto,
	    @Res() response: Response,
	)   {
	// console.log(req);
	let hh = req.session.passport;
	if(!hh)
	{
		response.redirect("http://localhost:3000/login",302);
	}

	if(req.url.startsWith("/auth2/code/?code="))  {
	
		if(1)
		{
			let ok = this.UserService.findBySaad(req.user.username);
			let fac = this.UserService.find2FA(req.user.username);
			if( (await ok) == 0){
			
				let id_num = req.user.id;
				var y: number = +id_num;
				id = y ;
				name = req.user.username ;
				// global = name ;
				Full_Name = req.user.displayName;
				two_factor = false;
				avatar = req.user.photos[0].value;
				line_status = "online";
				wins = 0;
				losses = 0;
				ladder_level = 0;
				
				achievements = null;
				secret = null;
				email = req.user.emails[0].value ;
				qrCode = null;
				
			
				let linki = "http://localhost:4200/accueil?id="  + id ;
				response.redirect(linki,302);
				
				await this.prismaService.user.create({
				    data : { id, name,
					    Full_Name, two_factor, avatar, line_status,
					    wins, losses, ladder_level, achievements, 
						secret ,
						email ,
						qrCode ,
						friends,
						demFriends ,
					},
			    });
		}
			else if (( (await ok) == 1)) {
			if(await fac == 1){ 
					response.redirect("http://localhost:3000/auth2/verify",302); 
			}
			else { 

				let id_num = req.user.id;
				var y: number = +id_num;
				id = y ;
				name = req.user.username ;
				await this.UserService.requestChangeStatus(req.user.id,"online");
				let link = "http://localhost:4200/accueil?id="  + id_num ;
				response.redirect(link,302);
				}
			return fac;	
		}
	
		}
	    
	}
	
    }
    

	
	
	@Get('generate')
	@UseGuards(AuthenticatedGuard)
	// @UseGuards(FortyTwoAuthGuard)
	async findAl(
	@Body() i: string,
	@Req() req,
	// @Res() response: Response,
	){
			let name =  req.user.username;
			let already = await this.UserService.find_already_2FA(name);

			if ((await already) == 1){
			const p = this.authService.generateQR(name , (await this.UserService.findid(name)));
			const f = '<img src="' + (await p).qrcode.toString() +'" /> ';
			let codeQr = (await p).qrcode;
			let secretQr = (await p).secret;
			const gf = await this.prismaService.user.update({
				where: {
					name: name,
				  },
				  data: {
					qrCode: f,
					secret: secretQr,
					two_factor: true ,
				  }	
				});
			return f;
			}
			if ((await already) == 0){
			const bv = (await this.UserService.findQrcode(name) );
			return bv;
			}

	}
	@Get('2FA')
	async a2fa(@Body() i: string,@Req() req
	,@Res() response: Response,){
		response.redirect("http://localhost:3000/auth2/generate",302);
	}
	
	@Get('un2FA')
	// @UseGuards(AuthenticatedGuard)
	async un2fa(@Body() i: string,@Req() req,){
		let name = req.user.username;
		let already = await this.UserService.find_already_2FA(name);
		if ((await already) == 0){
			const gf = await this.prismaService.user.update({
				where: {
					name: name,
				  },
				  data: {
					qrCode: null,
					secret: null,
					two_factor: false ,
				  }	
				});
			return "Done !";
		}
		if ((await already) == 1){
				const bv = (await this.UserService.findQrcode(name) );
				return "Already Done !";
		}

	}
	@Get('username')
	async Chat(@Res() res,@Req() req) {
	  // const messages = await this.appService.getMessages();
	  
	  if (req.session.passport)
	  {
		  let gg = req.user.username;
		  if( gg != undefined)
		  {
		   res.json(req.user.username);
		  }
		  else{
		  res.json(null);	  
		  }
		  
	  }
	  else
	  {
	  res.json(null);	  
	  }
	  

	}
	@Get('verify')
	// @HttpCode(301)
	// @UseGuards(AuthenticatedGuard)
	async findA(@Body() i: string,@Request() req,	@Res() response: Response,){
		// req.socket.parser[0] = "sejjed";
		// console.log("dsaas",req.isUnauthenticated);
		// ≈
		// req.body = "true";
		
		// response.sendFile( "/Users/saad/FINAL_RARE/srcs/nestjs-backend/src/auth/123.html");
		// if(!req.user.username)
		// 	return "f"
		// console.log(req.socket._sockname)
		// console.log(req.user.username)
		// console.log(req)
		
		// //********************************* */
		// let hh = req.session.passport;
		// if(!hh)
		// {
		// 	response.redirect("http://localhost:9876/auth2/login",302);
		// }
		// else
		// {
		
		
		let gg = (await this.UserService.find2FA( req.user.username));
		// let name_to_save = req.user.username;
		// req.session.destroy();
		if(gg == 1)
		{
				let phrase = '<form><div><label for="example">Veuillez saisir du texte</label><input id="example" type="text" name="text"></div><div><input type="submit" value="Envoyer"accesskey="s"></div></form>';
				// let name = name_to_save;
				
				let id = (await this.UserService.findid(req.user.username)) ;
				let secret = (await this.UserService.findSecret(req.user.username) ) ;
			
				if(req.url.split("verify?text=")[1]){
					let f = (await this.authService.verifyCode(id,req.url.split("verify?text=")[1],secret));
					if ((await f) == 1){
						await this.UserService.requestChangeStatus(req.user.id,"online");
						let link = "http://localhost:4200/accueil?id=" + req.user.id;
						response.redirect( link ,302);
					}
					if ((await f) == 0){
					phrase += " \n \n False code try again"; 
					response.send(phrase);			
					}
				}
				else{
				response.send(phrase);
				}
		}		
		// response.redirect("http://localhost:9876",302);
		// }

		// 
                                          
		
	}

	@Get('in')
	@UseGuards(AuthenticatedGuard)
	async find(
	@Req() req,
	@Res() response: Response,
	){

	}

	@Get('ingame')
	@UseGuards(AuthenticatedGuard)
	async ingame(@Body() name: string,	@Req() req,){
		
		const gf = await this.prismaService.user.update({
			where: {
				name: req.user.username,
			  },
			  data: {
				line_status: "In Game"
			  }
		  });
	}

	@Get('logout')
	@UseGuards(AuthenticatedGuard)
	async logout(@Body() name: string,	@Req() req,){
		
		const gf = await this.prismaService.user.update({
			where: {
				name: req.user.username,
			  },
			  data: {
				line_status: "offline"
			  }
		  });
		req.session.destroy();
	}
    
	@Get('123')
	findAll(): any {
	  console.log(this.prismaService.user.findFirst());
	}

	@Get('999')
	finvvAll(@Req() req): any {
	  console.log(req.socket._sockname);
	}

	@Get('login')
	@UseGuards(FortyTwoAuthGuard)
	async logi( @Body('id') displayName: string,
				@Body('displayName') id: string,
				@Body('username') username: string,
				@Request() req,) {}

}

