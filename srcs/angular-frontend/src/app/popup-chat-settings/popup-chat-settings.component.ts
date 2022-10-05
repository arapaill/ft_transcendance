import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { ChatChannel } from '../models/chat.model';
import { myUser, User } from '../models/user.model';

@Component({
  selector: 'app-popup-chat-settings',
  templateUrl: './popup-chat-settings.component.html',
  styleUrls: ['./popup-chat-settings.component.scss']
})
export class PopupChatSettingsComponent implements OnInit {
  isPasswordChecked: boolean = false;
  currentSettings: ChatChannel = {
    name: "",
    owner: "",
    admins: [],
    users: [],
    type: "",
    password: "",
    messages: []
  };
  disableSelect: boolean = true;
  myUserCpy: User = myUser;
  friendsList: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<PopupChatSettingsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentSettings.name = data.name,
      this.currentSettings.owner = data.owner,
      this.currentSettings.type = data.type,
      this.currentSettings.users = data.users,
      this.currentSettings.admins = data.admins
  }

  ngOnInit(): void {
    if (this.currentSettings.owner === myUser.pseudo)
      this.disableSelect = false;
    else
      this.disableSelect = true;

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

  isOwner() {
    if (this.currentSettings.owner === myUser.pseudo)
      return new FormControl(true);
    else
      return new FormControl(false);
  }
  
  closeDialog() {
    this.dialogRef.close();
  }

  submitValues(values: any) {
    this.dialogRef.close(values);
  }

  deleteChannel() {
    this.dialogRef.close("Delete");
  }

}
