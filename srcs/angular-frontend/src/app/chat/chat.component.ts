import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';
var bcrypt = require('bcryptjs');

import { WebSocketService } from '../web-socket.service'
import { PopupChatAddComponent } from '../popup-chat-add/popup-chat-add.component';
import { PopupChatSettingsComponent } from '../popup-chat-settings/popup-chat-settings.component';
import { PopupChatUserComponent } from '../popup-chat-user/popup-chat-user.component';
import { PopupChatPasswordComponent } from '../popup-chat-password/popup-chat-password.component';

import { ChatChannel, ChatMessage } from '../models/chat.model';
import { myUser } from '../models/user.model';
import { PopupChatJoinComponent } from '../popup-chat-join/popup-chat-join.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() channels: ChatChannel[] = [{
    id: 0,
    name: 'Général',
    owner: 'ADMIN',
    admins: [],
    users: [],
    type: 'Public',
    messages: [],
    usersBanned: [],
    usersKicked: [],
    usersMuted: []
  }];
  currentChannel: ChatChannel = this.channels[0];
  selectedChannel: string = this.currentChannel.name;
  blockList: number[] = [];

  constructor(private webSocketService: WebSocketService, private dialogRef: MatDialog, public myUser: myUser) {
    this.myUser.id = Number(localStorage.getItem('id'));
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.qr = data.qrCode;
      console.log('Blocklist ', data.blockList);
      this.myUser.blacklist = data.blockList === undefined ? [] : data.blockList;
      this.myUser.friends = data.friendList === undefined ? [] : data.friendList;
      this.blockList = data.blockList === undefined ? [] : data.blockList;
      this.checkMessages();
    });
    console.log("myUser.blacklist: ", this.myUser.blacklist);
    console.log("myUser.friends: ", this.myUser.friends);
    // console.log(bcrypt("test", 10));
   }

  ngOnInit(): void {
    this.webSocketService.emit("requestMyChannels", this.myUser.id);
    this.webSocketService.listen("getMyChannels").subscribe((data: any) => {
      if (data.length == 0)
        return ;
      if (this.channels.length != 1)
        this.channels = [];
      for (const channel of data) {
        let newChannel: ChatChannel = {
          id: channel.id,
          name: channel.name,
          owner: channel.owner,
          admins: channel.admins,
          users: channel.users,
          type: channel.type,
          password: channel.password,
          messages: [],
          usersBanned: channel.usersBanned,
          usersKicked: channel.usersKicked,
          usersMuted: channel.usersMuted
        }
        this.channels.push(newChannel);
      }
      this.currentChannel = this.channels[0];
      this.selectedChannel = this.currentChannel.name;
    })
    this.getChannelMessages();

    this.webSocketService.listen('getChannelMessages').subscribe((data: any) => {
      if (data.length == this.currentChannel.messages.length || data == undefined) {
        return ;
      }
      this.currentChannel.messages = [];
      for (let message of data) {
        let newMessage: ChatMessage = {
          userPseudo: message.userPseudo,
          userID: message.userID,
          userAvatar: message.userAvatar,
          text: message.text,
          date: new Date(message.date),
          channelName: message.channelName,
        }
        this.currentChannel.messages.push(newMessage);
      }
    });

    this.webSocketService.listen('getNewChannel').subscribe((channel: any) => {
      let newChannel: ChatChannel = {
        id: channel[0].id,
        name: channel[0].name,
        owner: channel[0].owner,
        admins: channel[0].admins,
        users: channel[0].users,
        type: channel[0].type,
        messages: [],
        usersBanned: [],
        usersKicked: [],
        usersMuted: []
      }
      this.channels.push(newChannel);
    });

    this.webSocketService.listen('getNewMessage').subscribe((message: any) => {
      if (this.currentChannel.name != message[0].channelName)
        return ;
      let newMessage: ChatMessage = {
        userPseudo: message[0].userPseudo,
        userID: message[0].userID,
        userAvatar: message[0].userAvatar,
        text: message[0].text,
        date: new Date(message[0].date),
        channelName: message[0].channelName,
      }
      this.currentChannel.messages.push(newMessage);
    });

    this.webSocketService.listen('broadcastDeleteChannel').subscribe((channelName: any) => {
      let index = this.channels.indexOf(channelName[0]);
      this.channels.splice(index, 1);
    });
  }

  checkMessages() {
    console.log('Checking...');
    for (const message of this.currentChannel.messages) {
      console.log('BEFORE:', message.text);
      message.text = this.displayMessage(message);
      console.log('AFTER:', message.text);
    }
  }

  sendNewMessage(msg: any): void {
    if (msg.value == "")
    return ;
    let newMessage: ChatMessage = {
      userPseudo: this.myUser.pseudo,
      userID: this.myUser.id,
      userAvatar: this.myUser.avatar,
      text: msg.value,
      date: new Date(),
      channelName: this.currentChannel.name
    }
    msg.value = "";
    this.webSocketService.emit("sendNewMessage", newMessage);
    this.webSocketService.emit("requestChannelMessages", this.currentChannel.name);
  }

  // async sendNewMessage(msg: any) {
  //   if (msg.value == "")
  //   return ;
  //   let newMessage: ChatMessage = {
  //     userPseudo: this.myUser.pseudo,
  //     userID: this.myUser.id,
  //     userAvatar: this.myUser.avatar,
  //     text: msg.value,
  //     date: new Date(),
  //     channelName: this.currentChannel.name
  //   }
  //   msg.value = "";
  //   var hash =  await bcrypt.hash("test", 10);
  //   console.log("the hash is: ", hash, "**");
  //   // console.log();
  //   const isPasswordMatching = await bcrypt.compare("tesgtrtrtt", hash);    
  //   console.log(isPasswordMatching)
  //   const works = await bcrypt.compare("test", hash);    
  //   console.log(works)
  //   // console.log(hash);
  //   this.webSocketService.emit("sendNewMessage", newMessage);
  //   this.webSocketService.emit("requestChannelMessages", this.currentChannel.name);
  // }

  getChannelMessages() {
    this.webSocketService.emit('requestChannelMessages', this.currentChannel.name);
  }

  async selectChannel(fchannel: string) {
    let tmpChannel = this.channels.find(x => x.name === fchannel);
    if (tmpChannel) {
      if (tmpChannel.type == "Protégé") {
        let settingsDialog = this.dialogRef.open(PopupChatPasswordComponent);
        settingsDialog.afterClosed().subscribe(async (password: any)  => {
          console.log(tmpChannel);
          if (tmpChannel != undefined && tmpChannel?.password != undefined) {
            let ret = await bcrypt.compare(password, tmpChannel?.password);
            if (tmpChannel?.password != undefined && ret) {
              this.currentChannel = tmpChannel;
              console.log('ACCEPTED');
            }
          }
        });
      }
      else
        this.currentChannel = tmpChannel;
    }
    this.getChannelMessages();
    this.checkMessages();
  }

  async createNewChannel(settings: any) {

    let adminsArray = settings.newAdmins ? settings.newAdmins : [];
    let usersArray = settings.newUsers ? settings.newUsers : [];
    
    adminsArray.push(this.myUser.pseudo);
    usersArray.push(this.myUser.pseudo);

    let newChannel: ChatChannel = {
      id: 0,
      name: settings.name,
      owner: this.myUser.pseudo,
      admins: adminsArray,
      users: usersArray,
      type: settings.type,
      password: settings.password,
      messages: [],
      usersBanned: [],
      usersKicked: [],
      usersMuted: []
    }
    console.log(newChannel);
    this.webSocketService.emit('createNewChannel', newChannel);
  }

  changeCurrentChannel(newSettings: any) {
    if (newSettings.action == "Delete") {
      this.webSocketService.emit('leaveChannel', {
        userID: this.myUser.id,
        channelID: this.currentChannel.id
      });
      this.webSocketService.emit("deleteChannel", this.currentChannel.name);
      let index = this.channels.indexOf(this.currentChannel);
      this.channels.splice(index, 1);
      return ;
    }
    this.currentChannel.name = newSettings.values.newName;
    this.currentChannel.type = newSettings.values.newType;
    if (this.currentChannel.type == "Protégé") {
      this.currentChannel.password = newSettings.values.newPassword;
    }
    this.currentChannel.users = newSettings.values.newUsers;
    this.currentChannel.admins = newSettings.values.newAdmins;
    this.webSocketService.emit('updateChannel', newSettings.values);
  }

  createMPChannel(user: string) {
    let newChannel: ChatChannel = {
      id: 0,
      name: this.myUser.pseudo + ' & ' + user,
      owner: this.myUser.pseudo,
      admins: [this.myUser.pseudo, user],
      users: [this.myUser.pseudo, user],
      type: "Privé",
      messages: [],
      usersBanned: [],
      usersKicked: [],
      usersMuted: []
    }
    this.channels.push(newChannel);
    this.webSocketService.emit('createNewChannel', newChannel);
  }

  displayMessage(message: ChatMessage): string {
    let text: string = message.text
  
    
    if (this.currentChannel.usersBanned.indexOf(message.userID) != -1)
      text = 'This user is banned.';
    else if (this.currentChannel.usersMuted.indexOf(message.userID) != -1)
      text = 'This user is muted.';
    else if (this.myUser.blacklist != undefined && this.myUser.blacklist.indexOf(message.userID) != -1)
      text = 'This user is blocked.';

    return text;
  }

  openSettingsDialog() {
    let settingsDialog = this.dialogRef.open(PopupChatSettingsComponent, {
      data: {
        name: this.currentChannel.name,
        owner: this.currentChannel.owner,
        type: this.currentChannel.type,
        users: this.currentChannel.users,
        admins: this.currentChannel.admins
      }
    });
  
    settingsDialog.afterClosed().subscribe(result => {
      if (result === undefined)
        return;
      this.webSocketService.emit('leaveChannel', {
        userID: this.myUser.id,
        channelID: this.currentChannel.id
      });
      if (result.action == 'Leave') {
        this.webSocketService.emit('leaveChannel', {
          userID: this.myUser.id,
          channelID: this.currentChannel.id
        });
      }
      else
        this.changeCurrentChannel(result);
    });
  }

  openAddDialog() {
    let settingsDialog = this.dialogRef.open(PopupChatAddComponent);

    settingsDialog.afterClosed().subscribe(result => {
      if (result === undefined)
        return;
      this.createNewChannel(result);
    });
  }

  openUserProfileDialog(user: ChatMessage) {
    let profileDialog = this.dialogRef.open(PopupChatUserComponent, {
      data: {
        userName: user.userPseudo,
        userAvatar: user.userAvatar,
        AmIOwner: this.currentChannel.owner === this.myUser.pseudo ? true : false,
        AmIAdmin: this.currentChannel.admins.indexOf(this.myUser.pseudo) != -1 ? true : false,
        channelOwner: this.currentChannel.owner,
        myUser: this.myUser,
        blockList: this.blockList
      }
    });

    profileDialog.afterClosed().subscribe(result => {
      console.log('CurrentChannelID: ', this.currentChannel.id);
      if (result === undefined)
        return;
      else if (result.action == 'PM')
        this.createMPChannel(result.user);
      else if (result.action == 'Kick')
        this.webSocketService.emit('kickUser', {
          channelID: this.currentChannel.id,
          userID: result.userID
        })
      else if (result.action == 'Mute')
        this.webSocketService.emit('muteUser', {
          channelID: this.currentChannel.id,
          userID: result.userID
        })
      else if (result.action == 'Ban')
        this.webSocketService.emit('banUser', {
          channelID: this.currentChannel.id,
          userID: result.userID
      })
    });
  }

  openJoinLeaveDialog() {
    console.log(this.myUser.pseudo);
    let joinLeaveDialog = this.dialogRef.open(PopupChatJoinComponent, {
      data: {
        pseudo: this.myUser.pseudo,
        id: this.myUser.id,
        avatar: this.myUser.avatar,
        blacklist: this.myUser.blacklist,
        friends: this.myUser.friends
      }
    });

    joinLeaveDialog.afterClosed().subscribe(results => {
      if (results === undefined)
        return;
      this.webSocketService.emit('joinChannel', {
        userID: this.myUser.id,
        channelID: results
      });
      this.webSocketService.emit("requestMyChannels", this.myUser.id);
    });
  }
}
