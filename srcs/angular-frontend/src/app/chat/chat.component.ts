import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../models/chat-message.model";
import { WebSocketService } from '../web-socket.service'
import { MatDialog } from  '@angular/material/dialog';
import { PopupChatAddComponent } from '../popup-chat-add/popup-chat-add.component';
import { PopupChatSettingsComponent } from '../popup-chat-settings/popup-chat-settings.component';
import { ChatChannel } from '../models/chat-channel.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() channels!: ChatChannel[];
  //@Input() chatMessages!: ChatMessage[];
  currentChannel!: ChatChannel;

  constructor(private webSocketService: WebSocketService, private  dialogRef : MatDialog) {}

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

    this.webSocketService.listen("getChatMessages").subscribe((data) => {
      console.log(data);
    })
  }

  submitMessage(msg: string): void {
    console.log(msg);
    this.webSocketService.emit("sendNewMessage", msg);
  }

  openSettingsDialog() {
    this.dialogRef.open(PopupChatSettingsComponent);
  }

  openAddDialog() {
    this.dialogRef.open(PopupChatAddComponent);
  }

}
