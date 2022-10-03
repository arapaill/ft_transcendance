import { Component, OnInit } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';
import { PopupClickHereComponent } from '../popup-click-here/popup-click-here.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private  dialogRef : MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialogRef.open(PopupClickHereComponent);
  }

}
