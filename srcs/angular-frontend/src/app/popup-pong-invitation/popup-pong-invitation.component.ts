import { Component, OnInit, Inject } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { myUser } from '../models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-pong-invitation',
  templateUrl: './popup-pong-invitation.component.html',
  styleUrls: ['./popup-pong-invitation.component.scss']
})
export class PopupPongInvitationComponent implements OnInit {
  userWhoInvite: string = '';

  constructor(private webSocketService: WebSocketService, public myUser: myUser,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupPongInvitationComponent>) {
                this.userWhoInvite = data.pseudo;
              }

  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.blacklist = data.blacklist;
      this.myUser.id = data.id;
    });

  }

  Accept() {
    this.webSocketService.emit("invitation", {
        TYPETYPE: "Accepte",
        MYUSER: this.userWhoInvite,
        USER: this.myUser.pseudo,
        USERID: this.myUser.id
    })
    this.dialogRef.close();
  }

  Refuse() {
    this.webSocketService.emit("invitation", {
      TYPETYPE: "Accepte",
      MYUSER: this.userWhoInvite,
      USER: this.myUser.pseudo,
      USERID: this.myUser.id
  })
  this.dialogRef.close();
  }
}
