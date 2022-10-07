import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	MessageBody,
  } from '@nestjs/websockets';
  import { Console } from 'console';
  import { Socket, Server } from 'socket.io';
  import { AppService } from '../app.service';
  import { UserService } from '../user/user.service';

//   import { user_export } from '../auth/auth.controller';
  
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
		let user = await this.userService.requestUserInfos(userName);
		this.server.to(client.id).emit("getUserInfos", user);
	}

	@SubscribeMessage('requestUserInfosID')
	async handlerequestUserInfosID(client, id: number): Promise<void> {
		let user = await this.userService.requestUserInfosID(id);
		this.server.to(client.id).emit("getUserInfosID", user);
	}

	@SubscribeMessage('requestUserMatchsHistory')
	async handlerequestUserMatchsHistory(client, userName: string): Promise<void> {
		let matchs = await this.userService.requestUserMatchsHistory( userName)
		this.server.to(client.id).emit("getUserMatchsHistory", matchs );
	}	

	@SubscribeMessage('requestTopFiveUsers')
	async hanldeRequestTopFiveUsers(client){
		let top5 = await  this.userService.requestTopFiveUsers();
		this.server.to(client.id).emit("getTopFive", top5);
	}

	@SubscribeMessage('updateFriendlist')
	async handleupdateFriendlist(client, user: unknown ): Promise<void> {
		let update = await this.userService.updateFriendlist(user);
		// this.server.emit("getUserInfos", matchs );
	}

	@SubscribeMessage('inviteUserToPlay')
	async handleInviteUserToPlay(client, data: any ): Promise<void> {
		this.server.emit("getInviteToPlay", data);
	}


	@SubscribeMessage('requestUserWins')
	async handleRequestUserWins(client, userID: number ): Promise<void> {
		let wins = await this.userService.requestUserWins(userID);
		this.server.to(client.id).emit("getUserWins", wins);
	}
	
	
/* 	@SubscribeMessage('requestIsUserPlaying')
	async handlerequestIsUserPlaying(client, userName: string): Promise<void> {
		let playing =  await this.userService.requestIsUserPlaying( userName) ;
		this.server.emit("getIsUserPlaying", playing);
	} */
	
	@SubscribeMessage('requestCheckUserName')
	async handlerequestCheckUserName(client, userName: string): Promise<void> {
		let ret = await  this.userService.requestCheckUserName(userName);
		this.server.to(client.id).emit("getCheckUserName", ret);
	}

	@SubscribeMessage('updateUser')
	async handleUpdateUser(client, user: unknown): Promise<void> {
		let updateUser = await this.userService.updateUser(user);
	}


	@SubscribeMessage('requestIsUserPlaying')
	async handleRequestIsUserPlaying(client, userID: number): Promise<void> {
		console.log("isInMatch requested");
		let match = await this.userService.requestIsUserPlaying(userID);
		this.server.to(client.id).emit('getIsUserPlaying', match);
	}
	

	
	handleConnection(client: Socket, ...args: any[]) {
	  // console.log(`Connected ${client.id}`);
	  //Do stuffs
	}
  }
  