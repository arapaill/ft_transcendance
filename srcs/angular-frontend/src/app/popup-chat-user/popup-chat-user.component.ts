import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WebSocketService } from '../web-socket.service'

import { ProfileModel} from "../models/profile-model.model";
import { myUser } from '../models/user.model';

@Component({
  selector: 'app-popup-chat-user',
  templateUrl: './popup-chat-user.component.html',
  styleUrls: ['./popup-chat-user.component.scss']
})
export class PopupChatUserComponent implements OnInit {
  @Input() Personne!: ProfileModel;
  blockedUsers: string[] = [];
  tmpUserName: string = '';
  tmpUserAvatar: string = '';
  userID: number = 0;

  constructor(private webSocketService: WebSocketService, public myUser:myUser,
    public dialogRef: MatDialogRef<PopupChatUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.blockedUsers = data.blockedUsers,
      this.tmpUserName = data.userName,
      this.tmpUserAvatar = data.userAvatar
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
    this.Personne = {
      avatar: this.tmpUserAvatar,
      name: this.tmpUserName,
      description: "I am Tester and I test things like this website or some other stuffs.",
      date: new Date(),
      victoires: 0,
      match: true,
      id: 108
    }
    this.webSocketService.emit("requestUserInfos", this.Personne.name);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      this.Personne.name = data.name;
      this.userID = data.id;
    });
  }

  isUserPlaying(): boolean {
    this.webSocketService.emit("requestIsUserPlaying", this.userID);
    this.webSocketService.listen("getIsUserPlaying").subscribe((data: any) => {
      return (data);
    });
    return false;
  }

  inviteToPlayOrWatch() {
    if (this.isUserPlaying()) {
      this.webSocketService.emit("spectate", {
        MYUSER: this.myUser.pseudo,
        USER: this.Personne.name,
        USERID: this.userID,
      })
    }
    else {
      this.webSocketService.emit("inviteUserToPlay", this.userID);
      this.webSocketService.emit("invitation", {
        TYPE: "Demande",
        MYUSER: this.myUser.pseudo,
        USER: this.Personne.name,
        USERID: this.userID,
      });

      /* this.webSocketService.emit("invitation", {
        TYPETYPE: "Accepte/Refuse",
        MYUSER: this.myUser,
        USER: this.Personne.Name,
        USERID: this.userID
      }) */
    }
    this.dialogRef.close();
  }

  sendPrivateMessage() {
    this.dialogRef.close({
      'user': this.Personne.name,
      'action': 'PM'
    });
  }

  blockUser() {
    if (!this.myUser.blacklist.has(this.Personne.name)) {
      this.myUser.blacklist.set(this.Personne.name, this.userID);
    }
    else
      this.myUser.blacklist.delete(this.Personne.name);
    this.webSocketService.emit("updateBlacklist", this.userID);
    this.dialogRef.close();
  }

  addToFriends() {
    if (!this.myUser.friends.has(this.Personne.name)) {
      this.myUser.friends.set(this.Personne.name, this.userID);
    }
    else
      this.myUser.friends.delete(this.Personne.name);
    this.webSocketService.emit("updateFriendlist", this.userID);
    this.dialogRef.close();
  }
}
