import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-add-friend',
  templateUrl: './popup-add-friend.component.html',
  styleUrls: ['./popup-add-friend.component.scss']
})
export class PopupAddFriendComponent implements OnInit {

  firstName;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { 
    this.firstName = data.name
  }

  ngOnInit(): void {
  }

}
