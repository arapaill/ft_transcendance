import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileModel } from '../models/profile-model.model';
import { myUser, User } from '../models/user.model';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-popup-chat-add',
  templateUrl: './popup-chat-add.component.html',
  styleUrls: ['./popup-chat-add.component.scss']
})
export class PopupChatAddComponent implements OnInit {
  isPasswordChecked = false;
  users: ProfileModel[] = [];

  constructor(private webSocketService: WebSocketService, public dialogRef: MatDialogRef<PopupChatAddComponent>, public myUser : myUser) { }

  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.emit("requestAllUsers", undefined);
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.blacklist = data.blacklist;
      this.myUser.friends = data.friends;
      this.myUser.id = data.id;
    });

    this.webSocketService.listen("getAllUsers").subscribe((data: any) => {
      for (const user of data) {
        let newUser: ProfileModel = {
          id: user.id,
          avatar: user.avatar,
          name: user.name,
          description: user.Description,
          date: user.Date,
          victoires: user.wins,
          match: user.match,
        }
        if (user.name != this.myUser.pseudo)
          this.users.push(newUser);
      }
    });
  }

  onToggle(event: any) {
    if (event.value === "Protégé")
      this.isPasswordChecked = true;
    else
      this.isPasswordChecked = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitValues(values: any) {
    console.log(values);
    this.dialogRef.close(values);
  }

}
