import { Component, OnInit } from '@angular/core';
import { myUser, User } from '../models/user.model';


@Component({
  selector: 'app-popup-display-friends',
  templateUrl: './popup-display-friends.component.html',
  styleUrls: ['./popup-display-friends.component.scss']
})
export class PopupDisplayFriendsComponent implements OnInit {
  user : User = myUser;
  friends !: string[];
  constructor() { }

  ngOnInit(): void {
  }

}
