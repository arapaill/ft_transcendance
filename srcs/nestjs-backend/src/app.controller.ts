import { AppService } from './app.service';
import { Controller, Render, Get, Res ,Req} from '@nestjs/common';
// import { user_export } from './auth/auth.controller';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/chat')
  @Render('index')
  Home() {
    return { message: 'Hello world!' };
  }

  @Get('/api/chat')
  async Chat(@Res() res,@Req() req) {
    // const messages = await this.appService.getMessages();
    res.json(req.user.username);
  }
  
//   @Get('1')
//   async convdffdv(@Req() req) {
// 	  console.log("!!!!!!!!!");
// 	  let ff = await user_export;
	  
// 	  console.log( req.user.username );
// 	  console.log("!!!!!!!!!");
// 	  return ff;
//   }
}
