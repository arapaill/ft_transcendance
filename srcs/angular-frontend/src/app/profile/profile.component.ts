import { Component, OnInit, Input } from '@angular/core';
import { myUser, User} from '../models/user.model';
import { MatDialog } from  '@angular/material/dialog';
import { PopupModifierProfilComponent } from '../popup-modifier-profil/popup-modifier-profil.component';
import { PopupDisplayFriendsComponent } from '../popup-display-friends/popup-display-friends.component';
import { WebSocketService } from '../web-socket.service';
import { PopupQrcodeComponent } from '../popup-qrcode/popup-qrcode.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private  dialogRef : MatDialog, private webSocketService: WebSocketService, public myUser : myUser){}
  two_factor : boolean = false;
  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      if(data.id == Number(localStorage.getItem('id')))
      {
        this.myUser.avatar = data.avatar;
        this.myUser.pseudo = data.name;
        this.myUser.description = data.Description;
        this.myUser.qr = data.qrCode;
        this.myUser.friends = data.friendsList;
        this.two_factor = data.two_factor;
      }
    });

  }


  openDialog(){
    let ret = this.dialogRef.open(PopupModifierProfilComponent);
    ret.afterClosed().subscribe((result: any)=>{
    })
  }
    displayFriends(){
      this.dialogRef.open(PopupDisplayFriendsComponent,{
        data : {
          friends : this.myUser.friends,
        }
      });
    }
    
  secureConect(){
    
    if(this.two_factor == false)
    {
      this.webSocketService.emit("request2FA", Number(localStorage.getItem('id')));
      this.two_factor = true;
    }
    else if (this.two_factor == true)
    {
      this.webSocketService.emit("requestUN2FA", Number(localStorage.getItem('id')));
      this.two_factor = false;
    }
  }

  openLogout(){
    this.webSocketService.emit("requestChangeStatus", Number(localStorage.getItem('id')), "Offline");
    localStorage.removeItem('id')
    this.dialogRef.open(LoginComponent);
  }

  showQR(){
    this.webSocketService.emit("requestQR", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getQR").subscribe((data: any) => {
      this.dialogRef.open(PopupQrcodeComponent,{
        data : data,
      });
    });
    
  }
}
