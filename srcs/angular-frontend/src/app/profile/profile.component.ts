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
  user : User = myUser;
  constructor(private  dialogRef : MatDialog, private webSocketService: WebSocketService ){}

  ngOnInit(): void {

  }


  openDialog(){
    let ret = this.dialogRef.open(PopupModifierProfilComponent);
    ret.afterClosed().subscribe(result=>{
      if(result.Nom)
        myUser.pseudo = result.Nom;
      if(result.Description)
        myUser.description = result.Description;
      this.user = myUser;
      this.webSocketService.emit("updateUser", myUser);
      
    })
  }
    displayFriends(){
      this.dialogRef.open(PopupDisplayFriendsComponent);
    }
  

}
