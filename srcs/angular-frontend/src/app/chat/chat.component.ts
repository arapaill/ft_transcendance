import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';

import { WebSocketService } from '../web-socket.service'
import { PopupChatAddComponent } from '../popup-chat-add/popup-chat-add.component';
import { PopupChatSettingsComponent } from '../popup-chat-settings/popup-chat-settings.component';

import { ChatMessage } from "../models/chat-message.model";
import { ChatChannel } from '../models/chat-channel.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() channels: ChatChannel[] = [];
  currentChannel!: ChatChannel;
  selectedChannel!: string;


  constructor(private webSocketService: WebSocketService, private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.currentChannel = {
      name: 'Général',
      admin: 'Corentin',
      users: ['Corentin', 'Alexandre'],
      passwordEnabled: false,
      messages: [
        {
          userPseudo: "cgoncalv",
          userAvatar: "assets/avatar-placeholder-1.png",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere volutpat metus, non convallis felis bibendum ut. Sed aliquet, neque eget pretium pretium, lorem mauris condimentum mi, auctor placerat eros justo sed ante. Ut sed mi est. Cras dictum ornare augue a cursus. Vivamus pulvinar, ex sit amet feugiat vehicula, tellus lorem gravida urna, at blandit ex mi rhoncus tellus. Aenean nec pharetra ante. Phasellus lobortis mi at ipsum varius interdum. Maecenas aliquet lacus sagittis enim commodo maximus. Nulla tristique lacinia nisi eu condimentum. Ut eu turpis eleifend, porta risus eu, venenatis erat. Ut eu purus ac eros pretium placerat et sed dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ",
          date: new Date()
        },
        {
          userPseudo: "arapaill",
          userAvatar: "assets/avatar-placeholder-2.png",
          text: "This is another test",
          date: new Date()
        },
        {
          userPseudo: "arapaill",
          userAvatar: "assets/avatar-placeholder-2.png",
          text: "This is another test",
          date: new Date()
        },
        {
          userPseudo: "cgoncalv",
          userAvatar: "assets/avatar-placeholder-1.png",
          text: "This is the last test",
          date: new Date()
        },
      ]
    }

    let newChannel: ChatChannel = {
      name: 'Autre',
      admin: 'Corentin',
      users: ['Corentin', 'Alexandre'],
      passwordEnabled: false,
      messages: [
        {
          userPseudo: "cgoncalv",
          userAvatar: "assets/avatar-placeholder-1.png",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere volutpat metus, non convallis felis bibendum ut. Sed aliquet, neque eget pretium pretium, lorem mauris condimentum mi, auctor placerat eros justo sed ante. Ut sed mi est. Cras dictum ornare augue a cursus. Vivamus pulvinar, ex sit amet feugiat vehicula, tellus lorem gravida urna, at blandit ex mi rhoncus tellus. Aenean nec pharetra ante. Phasellus lobortis mi at ipsum varius interdum. Maecenas aliquet lacus sagittis enim commodo maximus. Nulla tristique lacinia nisi eu condimentum. Ut eu turpis eleifend, porta risus eu, venenatis erat. Ut eu purus ac eros pretium placerat et sed dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ",
          date: new Date()
        }
      ]
    }

    this.channels.push(this.currentChannel);
    this.channels.push(newChannel);
    this.selectedChannel = this.currentChannel.name;

    this.webSocketService.listen("getChatMessages").subscribe((data) => {
      console.log(data);
    })
  }

  sendNewMessage(msg: string): void {
    let newMessage: ChatMessage = {
      userPseudo: "cgoncalv",
      userAvatar: "assets/avatar-placeholder-1.png",
      text: msg,
      date: new Date()
    }
    this.currentChannel.messages.push(newMessage);
    this.webSocketService.emit("sendNewMessage", newMessage);
  }

  selectChannel(fchannel: string) {
    console.log(fchannel);
    let tmpChannel = this.channels.find(x => x.name === fchannel);
    console.log(tmpChannel);
    if (tmpChannel) {
      this.currentChannel = tmpChannel;
    }
  }

  createNewChannel(settings: any) {
    let newChannel: ChatChannel = {
      name: settings.name,
      admin: settings.admin,
      users: settings.users,
      passwordEnabled: settings.passwordEnabled,
      password: settings.password,
      messages: []
    }
    this.channels.push(newChannel);
    this.webSocketService.emit('createNewChannel', newChannel);
  }

  changeCurrentChannel(newSettings: any) {
    this.currentChannel.name = newSettings.newName;
    if (newSettings.newPassword) {
      this.currentChannel.passwordEnabled = true;
      this.currentChannel.password = newSettings.newPassword;
    }
    this.webSocketService.emit('changeChannel', newSettings);
  }

  openSettingsDialog() {
    let settingsDialog = this.dialogRef.open(PopupChatSettingsComponent, {
      data: {
        channelName: this.currentChannel.name
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

}
