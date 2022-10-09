import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-chat-password',
  templateUrl: './popup-chat-password.component.html',
  styleUrls: ['./popup-chat-password.component.scss']
})
export class PopupChatPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupChatPasswordComponent>) {}

  ngOnInit(): void {
  }


  submitValues(values: any) {
    this.dialogRef.close(values.password);
  }
}
