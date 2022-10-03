import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { ChatChannel } from '../models/chat.model';

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
    public dialogRef: MatDialogRef<PopupChatSettingsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentSettings.name = data.name,
      this.currentSettings.owner = data.owner,
      this.currentSettings.type = data.type
  }

  ngOnInit(): void {
    if (this.currentSettings.owner === "Corentin")
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
    if (this.currentSettings.owner === "Corentin") // A changer
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
