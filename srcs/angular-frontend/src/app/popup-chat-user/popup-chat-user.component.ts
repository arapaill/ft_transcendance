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
      this.blockedUsers = data.blockedUsers,
      this.tmpUserName = data.userName,
      this.tmpUserAvatar = data.userAvatar
  }

  ngOnInit(): void {
    this.Personne = {
      avatar: this.tmpUserAvatar,
      avatarName: 'avatar-placeholder-1',
      Name: this.tmpUserName,
      Description: "I am Tester and I test things like this website or some other stuffs.",
      date: new Date(),
      victoires: 0,
      match: true
    }
    this.webSocketService.emit("requestUserInfos", this.Personne.Name);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      this.Personne.Name = data.name;
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
      //this.webSocketService.emit("")
    }
    else {
      this.webSocketService.emit("inviteUserToPlay", this.userID);
      this.webSocketService.emit("pongGame", undefined); // A voir avec Jandre
    }
    this.dialogRef.close();
  }

  sendPrivateMessage() {
    this.dialogRef.close({
      'user': this.Personne.Name,
      'action': 'PM'
    });
  }

  blockUser() {
    if (!myUser.blacklist.has(this.Personne.Name)) {
      myUser.blacklist.set(this.Personne.Name, this.userID);
      this.myUserCpy.blacklist = myUser.blacklist;
    }
    else
      myUser.blacklist.delete(this.Personne.Name);
    this.webSocketService.emit("updateBlacklist", this.userID);
    this.dialogRef.close();
  }

  addToFriends() {
    if (!myUser.friends.has(this.Personne.Name)) {
      myUser.friends.set(this.Personne.Name, this.userID);
      this.myUserCpy.friends = myUser.friends;
    }
    else
      myUser.friends.delete(this.Personne.Name);
    this.webSocketService.emit("updateFriendlist", this.userID);
    this.dialogRef.close();
  }
}
