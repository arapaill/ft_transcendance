import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';

import { WebSocketService } from '../web-socket.service'
import { PopupChatAddComponent } from '../popup-chat-add/popup-chat-add.component';
import { PopupChatSettingsComponent } from '../popup-chat-settings/popup-chat-settings.component';
import { PopupChatUserComponent } from '../popup-chat-user/popup-chat-user.component';
import { PopupChatPasswordComponent } from '../popup-chat-password/popup-chat-password.component';

import { ChatChannel, ChatMessage } from '../models/chat.model';
import { myUser, User } from '../models/user.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() channels: ChatChannel[] = [];
  currentChannel!: ChatChannel;
  selectedChannel!: string;
  myUserCpy: User = myUser;

  constructor(private webSocketService: WebSocketService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.currentChannel = {
      name: 'Général',
      owner: myUser.pseudo,
      admins: [],
      users: ['Corentin', 'Alexandre'],
      type: "Public",
      messages: [{
        userPseudo: "Alexandre",
        userAvatar: "assets/avatar-placeholder-1.png",
        text: "Hey",
        date: new Date(),
        channelName: 'Général'
      }]
    }

    let newChannel: ChatChannel = {
      name: 'Autre',
      owner: 'Corentin', // A changer
      admins: [],
      users: ['Corentin', 'Alexandre'],
      type: "Public",
      messages: []
    }

    this.channels.push(this.currentChannel);
    this.channels.push(newChannel);
    this.selectedChannel = this.currentChannel.name;

    this.webSocketService.emit("requestChannels", myUser.pseudo);
    this.webSocketService.listen("getChannels").subscribe((data: any) => {
      this.channels = data;
    })
  }

  sendNewMessage(msg: any): void {
    if (msg.value == "")
      return ;
    let newMessage: ChatMessage = {
      userPseudo: myUser.pseudo,
      userAvatar: myUser.avatar,
      text: msg.value,
      date: new Date(),
      channelName: this.currentChannel.name
    }
    msg.value = "";
    this.currentChannel.messages.push(newMessage);
    this.webSocketService.emit("requestUserInfos", "fejjed");
    this.webSocketService.emit("sendNewMessage", newMessage);
  }

  selectChannel(fchannel: string) {
    let tmpChannel = this.channels.find(x => x.name === fchannel);
    if (tmpChannel) {
      if (tmpChannel.type == "Protégé") {
        let settingsDialog = this.dialogRef.open(PopupChatPasswordComponent);
        settingsDialog.afterClosed().subscribe(password => {
          if (tmpChannel?.password !== undefined && password == tmpChannel?.password)
            this.currentChannel = tmpChannel;
        });
      }
      else
        this.currentChannel = tmpChannel;
    }
  }

  createNewChannel(settings: any) {
    let newChannel: ChatChannel = {
      name: settings.name,
      owner: myUser.pseudo,
      admins: settings.admin,
      users: settings.users,
      type: settings.type,
      password: settings.password,
      messages: []
    }
    this.channels.push(newChannel);
    this.webSocketService.socket.emit('createNewChannel', newChannel);
  }

  changeCurrentChannel(newSettings: any) {
    if (newSettings == "Delete") {
      this.webSocketService.emit("deleteChannel", newSettings.name);
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
      name: myUser.pseudo + ' & ' + user,
      owner: myUser.pseudo,
      admins: [user],
      users: [user],
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
        blockedUsers: myUser.blacklist
      }
    });

    profileDialog.afterClosed().subscribe(result => {
      if (result.action == 'PM')
        this.createMPChannel(result.user);
    });
  }
}
