import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChatChannel } from '../models/chat-channel.model';

@Component({
  selector: 'app-popup-chat-settings',
  templateUrl: './popup-chat-settings.component.html',
  styleUrls: ['./popup-chat-settings.component.scss']
})
export class PopupChatSettingsComponent implements OnInit {
  isPasswordChecked: boolean = false;
  channelName!: string;
  newSettings!: ChatChannel;

  constructor(
    public dialogRef: MatDialogRef<PopupChatSettingsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.channelName = data.channelName;
  }

  ngOnInit(): void {
  }

  onToggle(event: any) {
    if (event.checked == true)
      this.isPasswordChecked = true;
    else
      this.isPasswordChecked = false;
  }

  getValues(values: any) {
    this.dialogRef.close(values);
  }

}
