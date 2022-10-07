import { Component, OnInit, Input } from '@angular/core';
import { myUser, User} from '../models/user.model';
import { MatDialog } from  '@angular/material/dialog';
import { PopupModifierProfilComponent } from '../popup-modifier-profil/popup-modifier-profil.component';
import { PopupDisplayFriendsComponent } from '../popup-display-friends/popup-display-friends.component';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private  dialogRef : MatDialog, private webSocketService: WebSocketService, public myUser : myUser){}

  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.qr = data.qrCode;
      console.log(this.myUser);
    });

  }


  openDialog(){
    let ret = this.dialogRef.open(PopupModifierProfilComponent);
    ret.afterClosed().subscribe((result: any)=>{
    })
  }
    displayFriends(){
      this.dialogRef.open(PopupDisplayFriendsComponent);
    }
    
  secureConect(){
    this.webSocketService.emit("request2FA", Number(localStorage.getItem('id')));
  }

  showQR(){
    this.webSocketService.emit("requestQR", Number(localStorage.getItem('id')));
  }
}
