import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { myUser, User } from '../models/user.model';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-popup-chat-add',
  templateUrl: './popup-chat-add.component.html',
  styleUrls: ['./popup-chat-add.component.scss']
})
export class PopupChatAddComponent implements OnInit {
  isPasswordChecked = false;
  friendsList: string[] = [];

  constructor(private webSocketService: WebSocketService, public dialogRef: MatDialogRef<PopupChatAddComponent>, public myUser : myUser) { }

  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.blacklist = data.blacklist;
      this.myUser.id = data.id;
    });
    this.myUser.friends.forEach((key, value) => {
      this.friendsList.push(value);
    })
  }

  onToggle(event: any) {
    if (event.value === "Protégé")
      this.isPasswordChecked = true;
    else
      this.isPasswordChecked = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitValues(values: any) {
    console.log(values);
    this.dialogRef.close(values);
  }

}
