import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../models/chat-message.model"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatMessages!: ChatMessage[];
  channels: string[] = [
    "Général",
    "Tournois"
  ];
  currentChannel: string = this.channels[0];

  constructor() { }

  ngOnInit(): void {
    this.chatMessages = [
      {
        userPseudo: "cgoncalv",
        userAvatar: "assets/avatar-placeholder-1.png",
        text: "This is a test",
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
    ];
  }

}
