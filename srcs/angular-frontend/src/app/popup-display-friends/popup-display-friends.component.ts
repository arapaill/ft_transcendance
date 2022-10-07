import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoProfilComponent } from '../info-profil/info-profil.component';
import { myUser, User } from '../models/user.model';
import { WebSocketService } from '../web-socket.service';


@Component({
  selector: 'app-popup-display-friends',
  templateUrl: './popup-display-friends.component.html',
  styleUrls: ['./popup-display-friends.component.scss']
})
export class PopupDisplayFriendsComponent implements OnInit {
  friends : number[] = [];
  constructor(private  dialogRef : MatDialog, public myUser : myUser, private webSocketService: WebSocketService) { }
 
  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.blacklist = data.blacklist;
      this.myUser.id = data.id;
      data.friends.forEach((key : number, value : any) : any =>{
        this.friends.push(key);
      });
      console.log(data.friends);
    });
    
  }
  openDialog(num : number){
    this.dialogRef.open(InfoProfilComponent,{
      data : {
        num : num,
      }
    });
  }

}
