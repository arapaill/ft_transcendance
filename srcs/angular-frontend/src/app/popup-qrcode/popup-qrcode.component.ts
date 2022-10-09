import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { WebSocketService } from '../web-socket.service'



@Component({
  selector: 'app-popup-qrcode',
  templateUrl: './popup-qrcode.component.html',
  styleUrls: ['./popup-qrcode.component.scss']
})
export class PopupQrcodeComponent implements OnInit {

  QR !: any;
  constructor(private webSocketService: WebSocketService, private  dialogRef : MatDialog, @Inject(MAT_DIALOG_DATA) public data : any) {
      this.QR = data;
   }

  ngOnInit(): void {
    
  }

}
