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

	@SubscribeMessage('requestAllUsers')
	async handleRequestAllUsers(client, undefined): Promise<void> {
		let users = await this.userService.requestAllUsers();
		this.server.to(client.id).emit("getAllUsers", users);
	}

	@SubscribeMessage('requestUserInfosID')
	async handlerequestUserInfosID(client, id: number): Promise<void> {
		let user = await this.userService.requestUserInfosID(id);
		this.server.to(client.id).emit("getUserInfosID", user);
	}

	@SubscribeMessage('requestUserMatchsHistory')
	async handlerequestUserMatchsHistory(client, userName: string): Promise<void> {
		console.log("Requested match history");
		let matchs = await this.userService.requestUserMatchsHistory(userName)
		console.log(matchs);
		this.server.to(client.id).emit("getUserMatchsHistory", matchs);
	}	

	@SubscribeMessage('requestTopFiveUsers')
	async hanldeRequestTopFiveUsers(client){
		let top5 = await  this.userService.requestTopFiveUsers();
		this.server.to(client.id).emit("getTopFive", top5);
	}

	@SubscribeMessage('updateFriendlist')
	async handleupdateFriendlist(client, user: unknown ): Promise<void> {
		await this.userService.updateFriendlist(user);
	}

	@SubscribeMessage('updateBlocklist')
	async handleUpdateBlocklist(client, user: unknown ): Promise<void> {
		await this.userService.updateBlocklist(user);
	}

	@SubscribeMessage('inviteUserToPlay')
	async handleInviteUserToPlay(client, data: any ): Promise<void> {
		console.log("Sent invite to play to" + data.userToInvite);
		this.server.emit("getInviteToPlay", data);
	}

	@SubscribeMessage('requestUserWins')
	async handleRequestUserWins(client, userID: number ): Promise<void> {
		let wins = await this.userService.requestUserWins(userID);
		this.server.to(client.id).emit("getUserWins", wins);
	}
	
	
	@SubscribeMessage('requestIsUserPlaying')
	async handlerequestIsUserPlaying(client, userID: number): Promise<void> {
		let playing =  await this.userService.requestIsUserPlaying(userID) ;
		this.server.emit("getIsUserPlaying", playing);
	}
	
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
	
	// added new by saad night ---------------------------------------
	
	@SubscribeMessage('request2FA')
	async handlerequest2FA(client, userIDD: number): Promise<void> {
		console.log("2FA 2FA 2FA :  Id :" , userIDD);
		let user = await this.userService.request2FA(userIDD[0]);
		// this.server.emit("getUserInfos", user);
	}
	
	@SubscribeMessage('requestUN2FA')
	async handlerequestUN2FA(client, userIDD: number): Promise<void> {
		let user = await this.userService.requestUN2FA(userIDD);
		// this.server.emit("getUserInfos", user);
	}
	
	@SubscribeMessage('requestChangeStatus')
	async handlerequestChangeStatus(client, userIDD: number, newStatus: string): Promise<void> {
		let user = await this.userService.requestChangeStatus(userIDD, newStatus);
		// this.server.emit("getUserInfos", user);
	}
	
	//-------------------------------------------------------------
	

	
	handleConnection(client: Socket, ...args: any[]) {
	  // console.log(`Connected ${client.id}`);
	  //Do stuffs
	}
  }
  