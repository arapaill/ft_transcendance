import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WebSocketService } from '../web-socket.service'

import { ProfileModel} from "../models/profile-model.model";


@Component({
  selector: 'app-popup-chat-user',
  templateUrl: './popup-chat-user.component.html',
  styleUrls: ['./popup-chat-user.component.scss']
})
export class PopupChatUserComponent implements OnInit {
  @Input() Personne!: ProfileModel;
  blockedUsers: string[] = [];
  tmpUserName: string = '';

  constructor(private webSocketService: WebSocketService,
    public dialogRef: MatDialogRef<PopupChatUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.blockedUsers = data.blockedUsers,
      this.tmpUserName = data.userName
  }

  ngOnInit(): void {
    this.Personne = {
      avatar: 'assets/avatar-placeholder-1.png',
      avatarName: 'avatar-placeholder-1',
      Name: this.tmpUserName,
      Description: "I am Tester and I test things like this website or some other stuffs.",
      date: new Date(),
      victoires: 0,
      match: true
    }
  }

  isUserBlocked(userToCheck: string) {
    for (const user of this.blockedUsers) {
      if (user == userToCheck) {
        return true;
      }
    }
    return false;
  }

  isUserPlaying() {
 /*    if (user.playing == true)
      return true; */
    return false;
  }

  sendPrivateMessage() {
    this.dialogRef.close({
      'user': this.Personne.Name,
      'action': 'PM'
    });
  }

  blockUser() {
    this.dialogRef.close({
      'user': this.Personne.Name,
      'action': 'Block'
    })
  }
}
