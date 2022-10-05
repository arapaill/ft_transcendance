import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { myUser, User } from '../models/user.model';

@Component({
  selector: 'app-popup-chat-add',
  templateUrl: './popup-chat-add.component.html',
  styleUrls: ['./popup-chat-add.component.scss']
})
export class PopupChatAddComponent implements OnInit {
  isPasswordChecked = false;
  myUserCpy: User = myUser;
  friendsList: string[] = [];

  constructor(public dialogRef: MatDialogRef<PopupChatAddComponent>) { }

  ngOnInit(): void {
    myUser.friends.forEach((key, value) => {
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
