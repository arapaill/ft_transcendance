import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Console } from 'console';
  import { Socket, Server } from 'socket.io';
  import { AppService } from '../app.service';
  import { UserService } from '../user/user.service';

  
  @WebSocketGateway({
	cors: {
	  origin: 'http://localhost:4200',
	  credential: true,
	  namespace: 'auth',
	}
  })
  export class AuthGateway	
  {
	constructor(private appService: AppService, private userService:UserService) {}
  
	@WebSocketServer() server: Server;
  
	@SubscribeMessage('requestUserInfos')
	async handlerequestUserInfos(client, userName: string): Promise<void> {
		let User = await this.userService.requestUserInfos( userName);
		console.log(User);
		this.server.emit("getUserInfos", User);
	}
  

	@SubscribeMessage('requestUserMatchsHistory')
	async handlerequestUserMatchsHistory(client, userName: string): Promise<void> {
		let matchs = await this.userService.requestUserMatchsHistory( userName)
		this.server.emit("getUserMatchsHistory", matchs );
	}
	
	@SubscribeMessage('updateFriendlist')
	async handleupdateFriendlist(client, userName: string, newFriendID: number ): Promise<void> {
		let update = await this.userService.updateFriendlist( userName, newFriendID)
		// this.server.emit("getUserInfos", matchs );
	}
	
	
	@SubscribeMessage('requestIsUserPlaying')
	async handlerequestIsUserPlaying(client, userName: string): Promise<void> {
		let playing = this.userService.requestIsUserPlaying( userName) ;
		this.server.emit("getIsUserPlaying", playing);
	}
	
	
	
	@SubscribeMessage('requestCheckUserName')
	async handlerequestCheckUserName(client, userName: string): Promise<void> {
		let BL = this.userService.requestCheckUserName( userName) ;
		this.server.emit("getCheckUserName", BL );
	}
	
	handleConnection(client: Socket, ...args: any[]) {
	  // console.log(`Connected ${client.id}`);
	  //Do stuffs
	}
  }
  