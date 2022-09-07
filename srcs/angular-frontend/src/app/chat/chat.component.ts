import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../models/chat-message.model";
import { WebSocketService } from '../web-socket.service'

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
  currentChannel: string = 'Général';
  socket!: any;
  messageToSend: string = "";

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.socket = this.webSocketService.socket;

    this.socket.on("getMessage", (data: any) => {
      this.chatMessages = data;
    });

    /* this.chatMessages = [
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
    ]; */
  }

}
