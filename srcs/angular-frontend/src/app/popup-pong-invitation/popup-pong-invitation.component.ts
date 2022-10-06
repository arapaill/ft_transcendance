import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-popup-pong-invitation',
  templateUrl: './popup-pong-invitation.component.html',
  styleUrls: ['./popup-pong-invitation.component.scss']
})
export class PopupPongInvitationComponent implements OnInit {

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
  }

  Accept() {
    this.webSocketService.emit("invitation", {
        TYPETYPE: "Accepte/Refuse",
        MYUSER: myUser,
        USER: this.Personne.Name,
        USERID: this.userID
    })
  }

  Refuse() {
    this.webSocketService.emit("invitation", {
      TYPETYPE: "Accepte/Refuse",
      MYUSER: myUser,
      USER: this.Personne.Name,
      USERID: this.userID
    })
  }
}
