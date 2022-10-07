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
  tmpUserName: string = '';
  tmpUserAvatar: string = '';
  userID: number = 0;
  playing: boolean = false;

  constructor(private webSocketService: WebSocketService, public myUser:myUser,
    public dialogRef: MatDialogRef<PopupChatUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      //this.blockedUsers = data.blockedUsers,
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
      this.myUser.friends = data.friends;
      this.myUser.id = data.id;
    });
    this.Personne = {
      avatar: this.tmpUserAvatar,
      name: this.tmpUserName,
      description: "User not found",
      date: new Date(),
      victoires: 0,
      id: this.userID,
      match: []
    }
    this.webSocketService.emit("requestUserInfos", this.Personne.name);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      if (data !== undefined) {
        console.log(data.id);
        this.Personne.name = data.name;
        this.userID = data.id;
        this.Personne.victoires = data.victoires;
        this.Personne.id = data.id;
        this.playing = this.isUserPlaying();
      }
    });
  }

  isUserPlaying(): boolean {
    console.log(this.Personne.id);
    this.webSocketService.emit("requestIsUserPlaying", this.Personne.id);
    this.webSocketService.listen("getIsUserPlaying").subscribe((data: any) => {
      if (data != undefined)
        return (data);
    });
    return false;
  }

  inviteToPlayOrWatch() {
    if (this.isUserPlaying()) {
      this.webSocketService.emit("spectate", {
        MYUSER: this.myUser.pseudo,
        MYSOCKET: this.webSocketService.socket.id,
        USER: this.Personne.name,
        USERID: this.userID,
      })
    }
    else {
      this.webSocketService.emit("inviteUserToPlay", {
        userToInvite: this.userID,
        userWhoInvite: this.myUser.pseudo,
      });
      this.webSocketService.emit("invitation", {
        TYPE: "Demande",
        MYUSER: this.myUser.pseudo,
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
    if (this.myUser.blacklist.indexOf(this.Personne.id) == -1) {
      this.myUser.blacklist.push(this.Personne.id);
    }
    else {
      let index = this.myUser.blacklist.indexOf(this.Personne.id);
      this.myUser.blacklist.splice(index, 1);
    }
    this.webSocketService.emit("updateUser", this.myUser);
    this.dialogRef.close();
  }

  addToFriends() {
    if (this.myUser.friends.indexOf(this.Personne.id) == -1) {
      console.log('ADDED TO FRIENDS');
      this.myUser.friends.push(this.Personne.id);
    }
    else {
      let index = this.myUser.friends.indexOf(this.Personne.id);
      this.myUser.friends.splice(index, 1);
    }
    this.webSocketService.emit("updateUser", this.myUser);
    this.dialogRef.close();
  }
}
