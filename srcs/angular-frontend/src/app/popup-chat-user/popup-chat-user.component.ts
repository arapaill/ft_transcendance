import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { WebSocketService } from '../web-socket.service'

import { ProfileModel} from "../models/profile-model.model";


@Component({
  selector: 'app-popup-chat-user',
  templateUrl: './popup-chat-user.component.html',
  styleUrls: ['./popup-chat-user.component.scss']
})
export class PopupChatUserComponent implements OnInit {
  @Input() Personne!: ProfileModel;

  constructor(private webSocketService: WebSocketService,
    public dialogRef: MatDialogRef<PopupChatUserComponent>) { }

  ngOnInit(): void {
    this.Personne = {
      avatar: 'assets/avatar-placeholder-1.png',
      avatarName: 'avatar-placeholder-1',
      Name: "Corentin",
      Description: "I am Tester and I test things like this website or some other stuffs.",
      date: new Date(),
      victoires: 0,
      match: true
    }
  }

  sendPrivateMessage() {
    this.dialogRef.close(this.Personne.Name);
  }
}
