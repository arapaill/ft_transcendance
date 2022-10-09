import {
	Controller,
	Get,
	Post,
	Body,
	UseFilters,  
	ClassSerializerInterceptor,
	Header,
	UseInterceptors,
	Res,
	UseGuards,
	Req,} from '@nestjs/common';
// import { prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './user.dto';
//import { HttpExceptionFilter } from '../auth/ http-exception.filter';
import { Response } from 'express';
import { UserService } from './user.service';
import JwtAuthenticationGuard from '../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UserController {
	constructor(
		private readonly PrismaService: PrismaService,
		private  UserService: UserService,
	) {}
	
	@Get('find')
	async serr() {
		const i = this.UserService.findBySaad("sejje");
		// if (this.UserService.findBySaad("sejje")) { return "Yes";}
		// if ( !i ) { return "No";}
		// if ( i ) { return "Yes";}
		// console.log()
		// if((await i) != null){ return "Yes";}
		// else {return "No";}
		return i;
		// return i;
	}
	// @Post('generate')
	// @UseGuards(AuthGuard("jwt"))
	// async register(
	// @Res() response: Response,
	// // @Body() email: string , id: number
	// ) {
	
	//   const { otpauthUrl } = await this.UserService.generateTwoFactorAuthenticationSecret("ejjedsa@gmail.com",0);
	// //   console.log("email", email ,"id", id);
	// //   console.log("email");
	//   return this.UserService.pipeQrCodeStream(response, otpauthUrl);
	// }
	
	@Get('generate')
	// @UseGuards(AuthGuard('jwt'))
	async registe(
	// @Res() response: Response,
	// @Body() email: string , id: number
	) {
		this.UserService.setTwoFactorAuthenticationSecret("said", 0);
		// return "Yes";
	}
	// @UseFilters(HttpExceptionFilter)
	// @Get()
	// findAll(): any {
	// //   const gk= this.PrismaService.user.findFirstOrThrow({
		
	// 	// const ok = this.PrismaService.user.update({
	// 	// 	where: {
	// 	// 		id: 0,
	// 	// 	  },
	// 	// 	  data: {
	// 	// 		achievements: "999",
	// 	// 	  }				
	// 	// });
	// //   })
	// //   if(this.PrismaService.user.findFirstOrThrow({
	// // 	where: { name: 'sejjed10' },
	// // 	select: {
	// // 		name: true,
	// // 	  },
	// //   }))
	// //   {
	// //   console.log("->",gk,"<-")
	// //   }
	// 	return this.PrismaService.user.findMany({
	// 	where: {
	// 			id: 0,
	// 		  },
	// 	});
	//     //  gk;
	// }

	// @UseFilters(HttpExceptionFilter)
	// @Get('1')
	// findll(){		
	// 	const ok = this.PrismaService.user.update({
	// 		where: {
	// 			id: 0,
	// 		  },
	// 		  data: {
	// 			achievements: "aaaaa",
	// 		  }				
	// 	});
	// 	// console.log(ok)
	// //   if(this.PrismaService.user.findFirstOrThrow({
	// // 	where: { name: 'sejjed10' },
	// // 	select: {
	// // 		name: true,
	// // 	  },
	// //   }))
	// //   {
	// //   console.log("->",gk,"<-")
	// //   }
	// 	// ok this.PrismaService.user.findMany({});
	//     return ok;
	// }
	

	// @Post()
	// findAllPost(): Promise<UserDto[]> {
	//   return this.PrismaService.user.findMany();
	// }
	
	// id ,
	// name ,
	// Full_Name,
	// two_factor,
	// avatar,
	// line_status,
	// wins ,
	// losses ,
	// ladder_level ,
	// achievements  ,
	// friends    

	// @Post()
	// creat(
	// 	@Body() {id,name,Full_Name,two_factor,avatar,line_status,wins,losses,ladder_level,achievements,friends} : UserDto,
	// ): Promise<UserDto>  {
	  
	//   return this.PrismaService.user.create({
	//     data : { id, name, Full_Name, two_factor, avatar, line_status, wins, losses, ladder_level, achievements, friends},
	//   });
	// }
	//      
	
	
	// @Post()
	// async createUser(@Body() postData: User): Promise<User> {
	//   return this.userService.createUser(postData);
	// }
	// @Get(':id')
	// async getUser(@Param('id') id: number): Promise<User | null> {
	//   return this.userService.getUser(id);
	// }
	// @Put(':id')
	// async Update(@Param('id') id: number): Promise<User> {
	//   return this.userService.updateUser(id);
	// }
	// @Delete(':id')
	// async Delete(@Param('id') id: number): Promise<User> {
	//   return this.userService.deleteUser(id);
	// }
  }