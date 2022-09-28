import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-chat-add',
  templateUrl: './popup-chat-add.component.html',
  styleUrls: ['./popup-chat-add.component.scss']
})
export class PopupChatAddComponent implements OnInit {
  isPasswordChecked = false;

  constructor(public dialogRef: MatDialogRef<PopupChatAddComponent>) { }

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
