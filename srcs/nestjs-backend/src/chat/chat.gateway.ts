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
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';


/* var usernames = {};
var rooms = [
  { name: "global", creator: "Anonymous", mdp: "test" },
];
var bannedusers = [
  { group: "global", user: "Anonymous"},
];
var BannedbyUser = [
  {User: "global", Banned_User: "Anonymous"},
]; */

@WebSocketGateway({
	cors: {
	  origin: 'http://localhost:4200',
	  credential: true,
	  namespace: 'chat',
	}
})
export class ChatGateway {
  constructor(private appService: AppService, private chatService: ChatService) {}

  @WebSocketServer() server: Server;


  @SubscribeMessage('createNewChannel')
  async handleCreateNewChannel(@MessageBody() data: unknown) {
    await this.chatService.createNewChannel(data);
    this.server.emit('getNewChannel', data);
  }

  @SubscribeMessage('requestChannels')
  async handleRequestChannels(client, user: unknown) {
    let channels = await this.chatService.requestChannels(user);
    this.server.to(client.id).emit('getChannels', channels);
  }

  @SubscribeMessage('requestMyChannels')
  async handleRequestMyChannels(client, userID: number) {
    let channels = await this.chatService.requestMyChannels(userID);
    this.server.to(client.id).emit('getMyChannels', channels);
  }

  @SubscribeMessage('joinChannel')
  async handleJoinChannel(client, infos: unknown) {
    await this.chatService.joinChannel(infos);
  }

  @SubscribeMessage('leaveChannel')
  async handleLeaveChannel(client, infos: unknown) {
    await this.chatService.leaveChannel(infos);
  }

  @SubscribeMessage('updateChannel')
  async handleUpdateChannel(client, channel: unknown) {
    console.log(channel[0]);
    this.chatService.updateChannel(channel);
  }

  @SubscribeMessage('requestChannelMessages')
  async handleRequestChannelMessages(client, data: string) {
    let messages = await this.chatService.requestChannelMessages(data);
    console.log("********");
    console.log(data);
    this.server.to(client.id).emit('getChannelMessages', messages);
  }

  @SubscribeMessage('deleteChannel')
  async handleRequestDeleteChannel(@MessageBody() data: string) {
    let messages = await this.chatService.deleteChannel(data);
    this.server.emit('broadcastDeleteChannel', data);
  }

  @SubscribeMessage('sendNewMessage')
  async handleSendNewMessage(@MessageBody() data: unknown) {
    let channels = await this.chatService.sendNewMessage(data);
    this.server.emit('getNewMessage', data);
  }














  // ----------------------------------------------

/*   @SubscribeMessage('sendMessage')
  async handleSendMessage(client, payload: Chat): Promise<void> {
    await this.appService.createMessage(payload);
    console.log(client.id);
    this.server.to(client.currentRoom).emit('recMessage', payload);
  }

  @SubscribeMessage('SendPrivateMessage')
  async handleSendPrivateMessage(client, payload: Chat): Promise<void> {
    await this.appService.createMessage(payload);
    this.server.to(client.currentRoom).emit('RecPrivateMessage', payload);
    this.server.emit("updateUsersBannedUser", BannedbyUser);
  }


  @SubscribeMessage('SendPrivateMessageexp')
  async handleSendPrivateMessageexp(client, payload: Chat): Promise<void> {
    this.server.to(client.currentRoom).emit('RecPrivateMessage', payload);
  }


  @SubscribeMessage('banuser')
  async handlebanusere(client, Banned_User: string): Promise<void> {
    // console.log('bannedusers');
    var passed =false;
    for (var index in bannedusers) {
      if(bannedusers[index].group == client.currentRoom && bannedusers[index].user == Banned_User)
      {
          bannedusers[index].user = "";
          passed = true;
      }
    }
    if(passed != true)
      bannedusers.push({ group: client.currentRoom, user: Banned_User});
    // console.log(bannedusers);
    this.server.emit("BannedUser", bannedusers);
  }

  @SubscribeMessage('BannedbyUser')
  async handleBannedbyUser(client, Banned_User: string): Promise<void> {
    // console.log(client.username);
    // console.log(Banned_User);
    BannedbyUser.push({User: client.username, Banned_User: Banned_User});
    this.server.emit("updateUsersBannedUser", BannedbyUser);
  }

  afterInit(server: Server) {
    // console.log(server);
  }

  handleDisconnect(client: Socket) {
    // console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }
  
  @SubscribeMessage('createRoom')
  async handleCreateRoom(client, romy :{room : string, mdp :string}): Promise<void> {
    if (romy.room != null) {
      rooms.push({ name: romy.room, creator: client.username, mdp : romy.mdp });
      this.server.emit("updateRooms", rooms, null);
    }
  }
  @SubscribeMessage('updateRooms')
  async handleupdateRooms(client, room : any): Promise<void> {
    client.broadcast.to(client.currentRoom).emit("updateChat", "INFO", client.username + " left room", room, null);
    let filtered_arr = rooms.filter((obj)=> obj.name === room);
    var creator = filtered_arr.map(a => a.creator);
    if(client.username == creator.toString())
      client.emit("showOwnerTools");
    else
      client.emit("hideOwnerTools");
    client.leave(client.currentRoom);
    client.currentRoom = room;
    client.join(room);
      client.emit("updateChat", "INFO", "You have joined " + room + " room", room, null);
      client.broadcast.to(room).emit("updateChat","INFO",client.username + " has joined " + room + " room", room
      , null);
  }

  @SubscribeMessage('PrivateMsg')
  async handlePrivateMsg(client, room : any): Promise<void> {
    client.broadcast.to(client.currentRoom).emit("updateChat", "INFO", client.username + " left room", room, null);
    let filtered_arr = rooms.filter((obj)=> obj.name === room);
    var creator = filtered_arr.map(a => a.creator);
    client.leave(client.currentRoom);
    client.currentRoom = room;
    client.join(room);
      client.emit("updateChat", "INFO", "You have joined " + room + " room", room, null);
      client.broadcast.to(room).emit("updateChat","INFO",client.username + " has joined " + room + " room", room
      , null);
  }

  @SubscribeMessage('createUser')
  handlecreateUser(client,message: { sender: string, room: string, message: string }) {
    // console.log("dekhlt le user");
    client.username = message.sender;
    client.currentRoom = "global";
    usernames[message.sender] = client.currentRoom;
    client.join("global");
    // console.log(`User ${message.sender} created on server successfully.`);
    client.emit("updateChat", "INFO", "You have joined global room", client.currentRoom,message);
    client.broadcast.to("global").emit("updateChat", "INFO", message.sender + " has joined global room","global", message);
    this.server.emit("updateUsers", usernames ,BannedbyUser);
    client.emit("updateRooms", rooms, "global");
    // this.server.emit("hideOwnerTools");
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(`Connected ${client.id}`);
    //Do stuffs
  } */
}
