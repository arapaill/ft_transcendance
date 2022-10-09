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
  userID: number = 0;
  playing: boolean = false;
  amIOwner: boolean = false;
  amIAdmin: boolean = false;
  channelOwner: string = '';

  constructor(private webSocketService: WebSocketService, public myUser:myUser,
    public dialogRef: MatDialogRef<PopupChatUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.amIOwner = data.AmIOwner;
      this.amIAdmin = data.AmIAdmin;
      this.channelOwner = data.channelOwner;
      this.Personne = {
        avatar: data.userAvatar,
        name: data.userName,
        description: "User not found",
        date: new Date(),
        victoires: 0,
        id: 0,
        match: false,
        status: "online",
      }
      this.myUser = data.myUser;
      this.myUser.blacklist = data.blockList;
  }

  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.emit("requestUserInfos", this.Personne.name);

    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      if (data.friendlist)
        this.myUser.friends = data.friendlist;
      this.myUser.id = data.id;
    });

    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      if (data !== undefined) {
        this.Personne.name = data.name;
        this.Personne.description = data.Description,
        this.Personne.victoires = data.victoires;
        this.Personne.id = data.id;
        this.playing = data.match;
      }
    });

    this.webSocketService.listen("getIsUserPlaying").subscribe((data: any) => {
      if (data !== undefined)
        this.playing = data;
      else
        this.playing = false;
    });
  }

  isUserPlaying() {
    this.webSocketService.emit("requestIsUserPlaying", this.Personne.id);
  }

  inviteToPlay() {
    this.isUserPlaying();
    if (this.playing == false) {
      this.webSocketService.emit("inviteUserToPlay", {
        userToInvite: this.Personne.id,
        userWhoInvite: this.myUser.pseudo,
      });
      this.webSocketService.emit("invitation", {
        TYPE: "Demande",
        MYSOCKET: this.webSocketService.socket.id,
        MYUSER: this.myUser.pseudo,
        USER: this.Personne.name,
        USERID: this.Personne.id,
      });
      this.dialogRef.close();
    }
  }

  inviteToWatch() {
    this.isUserPlaying();

    if (this.playing == true) {
      this.webSocketService.emit("spectate", {
        MYUSER: this.myUser.pseudo,
        MYSOCKET: this.webSocketService.socket.id,
        USER: this.Personne.name,
        USERID: this.Personne.id,
      });
      this.dialogRef.close();
    }
  }

  sendPrivateMessage() {
    this.dialogRef.close({
      'user': this.Personne.name,
      'action': 'PM'
    });
  }

  blockUser() {
    if (this.myUser.blacklist) {
      if (this.myUser.blacklist.indexOf(this.Personne.id) == -1) {
        this.myUser.blacklist.push(this.Personne.id);
      }
      else {
        let index = this.myUser.blacklist.indexOf(this.Personne.id);
        this.myUser.blacklist.splice(index, 1);
      }
      this.webSocketService.emit("updateBlocklist", {
        myID: this.myUser.id,
        friendID: this.Personne.id
      });
    }
    else {
      this.myUser.blacklist = [];
      this.myUser.blacklist.push(this.Personne.id);
      this.webSocketService.emit("updateBlocklist", {
        myID: this.myUser.id,
        friendID: this.Personne.id
      });
    }
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.dialogRef.close();
  }

  addToFriends() {
    this.webSocketService.emit("updateFriendlist", {
      myID: Number(localStorage.getItem('id')),
      friendID: this.Personne.id
    });
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.dialogRef.close();
  }

  muteUser() {
    this.dialogRef.close({
      user: this.Personne.name,
      userID: this.Personne.id,
      action: 'Mute'
    });
  }

  kickUser() {
    this.dialogRef.close({
      user: this.Personne.name,
      userID: this.Personne.id,
      action: 'Kick',
    });
  }

  banUser() {
    this.dialogRef.close({
      user: this.Personne.name,
      userID: this.Personne.id,
      action: 'Ban',
    });
  }
}
