import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { InfoProfilComponent } from '../info-profil/info-profil.component';
import { ProfileModel } from '../models/profile-model.model';
import { myUser, User } from '../models/user.model';
import { WebSocketService } from '../web-socket.service';


@Component({
  selector: 'app-popup-display-friends',
  templateUrl: './popup-display-friends.component.html',
  styleUrls: ['./popup-display-friends.component.scss']
})
export class PopupDisplayFriendsComponent implements OnInit {
  friends : number[] = [];
  friendslist : string[] = [];
  Personne !: ProfileModel;
  constructor(public myUser : myUser, private webSocketService: WebSocketService, private  dialogRef : MatDialog, @Inject(MAT_DIALOG_DATA) public data : any) {
    this.friends = data.friends;
   }
 
  ngOnInit(): void {
    console.log(this.friends);
    for (const num of this.friends) {
      this.webSocketService.emit("requestUserInfosID", num);
      this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
        this.friendslist.push(data.name);
    });
    }
  }

  openDialog(num : string){
      this.dialogRef.open(InfoProfilComponent,{
        data : {
          name : num,
        }
      });
      
  }
}