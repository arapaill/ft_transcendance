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
  myUserCpy = myUser;
  userID: number = 0;

  constructor(private webSocketService: WebSocketService,
    public dialogRef: MatDialogRef<PopupChatUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      //this.blockedUsers = data.blockedUsers,
      this.tmpUserName = data.userName,
      this.tmpUserAvatar = data.userAvatar
  }

  ngOnInit(): void {
    this.Personne = {
      avatar: this.tmpUserAvatar,
      name: this.tmpUserName,
      description: "User not found",
      date: new Date(),
      victoires: 0,
      match: true,
      id: 108
    }
    this.webSocketService.emit("requestUserInfos", this.Personne.name);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      if (data !== undefined) {
        this.Personne.name = data.name;
        this.userID = data.id;
        this.Personne.victoires = data.victoires;
        this.Personne.id = data.id;
      }
    });
  }

  isUserPlaying(): boolean {
    this.webSocketService.emit("requestIsUserPlaying", this.userID);
    this.webSocketService.listen("getIsUserPlaying").subscribe((data: any) => {
      if (data != undefined)
        return (data);
    });
    return false;
  }

  inviteToPlayOrWatch() {
    if (this.isUserPlaying()) {
      this.webSocketService.emit("spectate", {
        MYUSER: myUser.pseudo,
        MYSOCKET: this.webSocketService.socket.id,
        USER: this.Personne.name,
        USERID: this.userID,
      })
    }
    else {
      this.webSocketService.emit("inviteUserToPlay", this.userID);
      this.webSocketService.emit("invitation", {
        TYPE: "Demande",
        MYUSER: myUser.pseudo,
        USER: this.Personne.name,
        USERID: this.userID,
      });
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
    if (!myUser.blacklist.has(this.Personne.name)) {
      myUser.blacklist.set(this.Personne.name, this.userID);
      this.myUserCpy.blacklist = myUser.blacklist;
    }
    else
      myUser.blacklist.delete(this.Personne.name);
    this.webSocketService.emit("updateBlacklist", this.userID);
    this.dialogRef.close();
  }

  addToFriends() {
    if (!myUser.friends.has(this.Personne.name)) {
      myUser.friends.set(this.Personne.name, this.userID);
      this.myUserCpy.friends = myUser.friends;
    }
    else
      myUser.friends.delete(this.Personne.name);
    this.webSocketService.emit("updateFriendlist", this.userID);
    this.dialogRef.close();
  }
}
