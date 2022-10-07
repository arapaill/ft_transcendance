import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';

import { WebSocketService } from '../web-socket.service'
import { PopupChatAddComponent } from '../popup-chat-add/popup-chat-add.component';
import { PopupChatSettingsComponent } from '../popup-chat-settings/popup-chat-settings.component';
import { PopupChatUserComponent } from '../popup-chat-user/popup-chat-user.component';
import { PopupChatPasswordComponent } from '../popup-chat-password/popup-chat-password.component';

import { ChatChannel, ChatMessage } from '../models/chat.model';
import { myUser } from '../models/user.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() channels: ChatChannel[] = [{
    name: 'Général',
    owner: 'ADMIN',
    admins: [],
    users: [],
    type: 'Public',
    messages: [{
      userPseudo: 'Alexandre',
      userAvatar: 'assets/avatar-placeholder-1.png',
      text: 'Ceci est un unique message de test.',
      date: new Date(),
      channelName: 'Général',
    }] 
  }];
  currentChannel: ChatChannel = this.channels[0];
  selectedChannel: string = this.currentChannel.name;

  constructor(private webSocketService: WebSocketService, private dialogRef: MatDialog, public myUser: myUser ) {
    this.myUser.id = Number(localStorage.getItem('id'));
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.id = data.id; 
      this.myUser.blacklist = data.blacklist;
    });
   }

  ngOnInit(): void {
    this.webSocketService.emit("requestChannels", this.myUser.id);
    this.webSocketService.listen("getChannels").subscribe((data: any) => {
      console.log(data);
      if (data.length == 0)
        return ;
      if (this.channels.length != 1)
        this.channels = [];
      for (const channel of data) {
        let newChannel: ChatChannel = {
          name: channel.name,
          owner: channel.owner,
          admins: channel.admins,
          users: channel.users,
          type: channel.type,
          messages: []
        }
        this.channels.push(newChannel);
      }
      this.currentChannel = this.channels[0];
      this.selectedChannel = this.currentChannel.name;
      this.getChannelMessages();
    })
    this.webSocketService.listen('getChannelMessages').subscribe((data: any) => {
      if (data.length == this.currentChannel.messages.length || data == undefined) {
        return ;
      }
      this.currentChannel.messages = [];
      for (let message of data) {
        let newMessage: ChatMessage = {
          userPseudo: message.userPseudo,
          userAvatar: message.userAvatar,
          text: message.text,
          date: new Date(message.date),
          channelName: message.channelName,
        }
        this.currentChannel.messages.push(newMessage);
      }
    });

    this.webSocketService.listen('getNewChannel').subscribe((channel: any) => {
      let newMessage: ChatChannel = {
        name: channel[0].name,
        owner: channel[0].owner,
        admins: channel[0].admins,
        users: channel[0].users,
        type: channel[0].type,
        messages: []
      }
      this.channels.push(newMessage);
    });

    this.webSocketService.listen('getNewMessage').subscribe((message: any) => {
      if (this.currentChannel.name != message[0].channelName)
        return ;
      let newMessage: ChatMessage = {
        userPseudo: message[0].userPseudo,
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

  sendNewMessage(msg: any): void {
    if (msg.value == "")
    return ;
    let newMessage: ChatMessage = {
      userPseudo: this.myUser.pseudo,
      userAvatar: this.myUser.avatar,
      text: msg.value,
      date: new Date(),
      channelName: this.currentChannel.name
    }
    msg.value = "";
    console.log(this.currentChannel);
    this.webSocketService.emit("sendNewMessage", newMessage);
    this.currentChannel.messages.push(newMessage);
    this.webSocketService.emit("requestChannelMessages", this.currentChannel.name);
  }

  getChannelMessages() {
    this.webSocketService.emit('requestChannelMessages', this.currentChannel.name);
  }

  selectChannel(fchannel: string) {
    let tmpChannel = this.channels.find(x => x.name === fchannel);
    if (tmpChannel) {
      if (tmpChannel.type == "Protégé") {
        let settingsDialog = this.dialogRef.open(PopupChatPasswordComponent);
        settingsDialog.afterClosed().subscribe(password => {
          console.log(password);
          console.log(tmpChannel);
          if (tmpChannel?.password !== undefined && password == tmpChannel?.password) {
            console.log('OK');
            this.currentChannel = tmpChannel;
          }
          else
            console.log('DENIED');
        });
      }
      else
        this.currentChannel = tmpChannel;
    }
    this.getChannelMessages();
  }

  createNewChannel(settings: any) {
    let newChannel: ChatChannel = {
      name: settings.name,
      owner: this.myUser.pseudo,
      admins: settings.admin,
      users: settings.users,
      type: settings.type,
      password: settings.password,
      messages: []
    }
    this.channels.push(newChannel);
    this.webSocketService.emit('createNewChannel', newChannel);
  }

  changeCurrentChannel(newSettings: any) {
    if (newSettings == "Delete") {
      this.webSocketService.emit("deleteChannel", this.currentChannel.name);
      let index = this.channels.indexOf(this.currentChannel);
      this.channels.splice(index, 1);
      return ;
    }
    this.currentChannel.name = newSettings.newName;
    this.currentChannel.type = newSettings.newType;
    if (this.currentChannel.type == "Protégé") {
      this.currentChannel.password = newSettings.newPassword;
    }
    this.currentChannel.users = newSettings.newUsers;
    this.currentChannel.admins = newSettings.newAdmins;
    this.webSocketService.emit('updateChannel', newSettings);
  }

  createMPChannel(user: string) {
    let newChannel: ChatChannel = {
      name: this.myUser.pseudo + ' & ' + user,
      owner: this.myUser.pseudo,
      admins: [this.myUser.pseudo, user],
      users: [this.myUser.pseudo, user],
      type: "Privé",
      messages: []
    }
    this.channels.push(newChannel);
    this.webSocketService.emit('createNewChannel', newChannel);
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
      this.changeCurrentChannel(result);
    });
  }

  openAddDialog() {
    let settingsDialog = this.dialogRef.open(PopupChatAddComponent);

    settingsDialog.afterClosed().subscribe(result => {
      this.createNewChannel(result);
    });
  }

  openUserProfileDialog(user: ChatMessage) {
    let profileDialog = this.dialogRef.open(PopupChatUserComponent, {
      data: {
        userName: user.userPseudo,
        userAvatar: user.userAvatar,
        blockedUsers: this.myUser.blacklist
      }
    });

    profileDialog.afterClosed().subscribe(result => {
      if (result.action == 'PM')
        this.createMPChannel(result.user);
    });
  }
}
