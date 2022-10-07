import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { myUser} from './models/user.model';
import { WebSocketService } from './web-socket.service';
import { MatDialog } from  '@angular/material/dialog';
import { PopupPongInvitationComponent } from 'src/app/popup-pong-invitation/popup-pong-invitation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'THE AMAZING PONG';
  loc !: string;
  
  constructor(private webSocketService: WebSocketService, private Location:Location, private myUser: myUser, private dialogRef: MatDialog) {}
  userID : number = Number( localStorage.getItem('id'));
  ngOnInit(): void {
    this.loc = this.Location.path();
    if((this.loc.split("id="))[1] && !this.userID)
    {
      this.loc = (this.loc.split("id="))[1];
      this.userID = Number(this.loc);
      localStorage.setItem('id', this.loc);
      
  
      this.webSocketService.emit("requestUserInfosID", this.userID);
      this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {

        this.myUser.avatar = data.avatar;
        this.myUser.blacklist = data.blacklist;
        this.myUser.description = data.Description;
        this.myUser.friends = data.friends;
        this.myUser.id = data.id;
        this.myUser.pseudo = data.name;
    });
   }
   console.log(this.userID);

    this.webSocketService.listen("getInviteToPlay").subscribe((data: any) => {
      if (data.userToInvite == this.myUser.pseudo) {
      this.dialogRef.open(PopupPongInvitationComponent, {
        data: {
          user: data,
        }
      });
    }
    });
  }
    
}

