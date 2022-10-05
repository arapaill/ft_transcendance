import { Body, Controller, Get, Post , Delete, Redirect, Req , Request,Param, Headers, Query ,Res, HttpCode , UseGuards
	, ExceptionFilter,UseFilters , ExecutionContext ,RawBodyRequest,} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthDto } from './dto';
import { request, Response} from 'express';
import { Socket, Server } from 'socket.io';
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


// let global  = "sejjed";

const fs = require('fs');
// var imagejk = new Image();
@Controller('auth2')
export class AuthController {
	// constructor() {}
	constructor(
	private readonly prismaService: PrismaService,
	private authService: AuthService,
	private readonly UserService: UserService,
		) {}
	
	
	// @UseGuards(AuthenticatedGuard)
	@Get('1111')
	async hhh(@Req() req,){
	let h = this.UserService.requestUserInfos( "fejjed");
	return h
	
	}
	
	
	@Get('111')
	async hhvvh(@Req() req,){
	return this.UserService.requestUserInfos(req.user.username);
	
	}
	
	// @Public()
	@Get('code')
	// @UseFilters(HttpExceptionFilter)
	@UseGuards(FortyTwoAuthGuard)
	// @UseGuards(LocalAuthGuard)
	// @UseGuards(AuthenticatedGuard)
     async getHello(
        @Request() req,
        
        @Body() {id, name,
	    Full_Name, two_factor, avatar, line_status,
	    wins, losses, ladder_level, achievements, 
	    
	    secret,email,qrCode,friends,demFriends,
	    }: UserDto,
	    
	    @Res() response: Response,
	)   {
	// console.log(req);
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
				response.send("Happy to   your first time login , we created your user ");
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
	// console.log(">>>",fac,"<<<");
	
		if(await fac == 1){ 
			// response.redirect("http://localhost:9876/auth2/verify",302); 
			
			
			// let name = req.user.username;
			// let id = (await this.UserService.findid(name)) ;
			// let secret = (await this.UserService.findSecret(name) ) ;
			
			// console.log("-*-name:",name,"-*-id:",id, "-*-secret:",secret);
			// let phrase = '<form><div><label for="example">Veuillez saisir du texte</label><input id="example" type="text" name="text"></div><div><input type="submit" value="Envoyer"accesskey="s"></div></form>';
			// if(req.url.split("?text=")[1]){
			// 	let f = (await this.authService.verifyCode(id,req.url.split("?text=")[1],secret));
			// 	if ((await f) == 1){
				// response.redirect("http://localhost:4200/",302);
				// req.session.wait;
				//  req.session.cookie.originalMaxAge= 1 ;
				// req.session.originalMaxAge == 110000;
				// req.params = "0";
				// console.log("YYYYY? " , req.session.originalMaxAge )
				req.socket._sockname = "987";
				response.redirect("http://localhost:9876/auth2/verify",302); 
				// response.sendFile( "/Users/saad/FINAL_RARE/srcs/nestjs-backend/src/auth/123.html");
				// console.log(req.session.cookie.httpOnly);
				// return await req.session.cookie;
				// response.send("1");
				// }
				// if ((await f) == 0){
				// phrase += " \n \n False code try again"; 
				// response.send(phrase);			
				// }
				
			// }
			// else{
			// response.send(phrase);
			// }
			
		}
		else { 
		// return "Happy to see you again login , welcome to your favorite game"; 
		// response.redirect("http://localhost:9876/auth2/111",302); 
			response.send("Happy to see you again login , welcome to your favorite game" );
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
		response.redirect("http://localhost:9876/auth2/generate",302);
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

	@Get('verify')
	// @UseGuards(AuthenticatedGuard)
	// @UseGuards(FortyTwoAuthGuard)
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
		if(req.user.username)
		{
			// if(req.socket._sockname)
			// {
			
				let phrase = '<form><div><label for="example">Veuillez saisir du texte</label><input id="example" type="text" name="text"></div><div><input type="submit" value="Envoyer"accesskey="s"></div></form>';
				let name = req.user.username;
				let id = (await this.UserService.findid(name)) ;
				let secret = (await this.UserService.findSecret(name) ) ;
			
				if(req.url.split("verify?text=")[1]){
					let f = (await this.authService.verifyCode(id,req.url.split("verify?text=")[1],secret));
					if ((await f) == 1){
						// return req.session.fff ==  0 ;
						// req.session.cookie.httpOnly = false ;
						// console.log(">>>>", req.session.cookie);
						
						response.redirect("http://localhost:4200/",302);
					// response.send(1phrase);
					}
					if ((await f) == 0){
					phrase += " \n \n False code try again"; 
					response.send(phrase);			
					}
				}
				else{
				response.send(phrase);
				} 
			// }		
		}

                                          
		
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
	async logi(@Body('id') displayName: string ,
				 @Body('displayName') id: string ,
				 @Body('username') username: string ,
				 @Request() req,
				 ) {
			
	}

}


