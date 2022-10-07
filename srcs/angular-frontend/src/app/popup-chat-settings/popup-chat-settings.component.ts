import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { ChatChannel } from '../models/chat.model';
import { myUser, User } from '../models/user.model';
import { WebSocketService } from '../web-socket.service';

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

  constructor(
    private webSocketService: WebSocketService,
    public dialogRef: MatDialogRef<PopupChatSettingsComponent>, public myUser : myUser,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentSettings.name = data.name,
      this.currentSettings.owner = data.owner,
      this.currentSettings.type = data.type,
      this.currentSettings.users = data.users,
      this.currentSettings.admins = data.admins
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
    if (this.currentSettings.owner === this.myUser.pseudo)
      this.disableSelect = false;
    else
      this.disableSelect = true;
  }

  onToggle(event: any) {
    if (event.value === "Protégé")
      this.isPasswordChecked = true;
    else
      this.isPasswordChecked = false;
  }

  isOwner() {
    if (this.currentSettings.owner === this.myUser.pseudo)
      return new FormControl(true);
    else
      return new FormControl(false);
  }

  shouldBlock() {
    if (this.currentSettings.type != 'Public')
      return (this.disableSelect);
    else
      return (true);
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
