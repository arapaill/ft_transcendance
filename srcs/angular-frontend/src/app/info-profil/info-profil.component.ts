import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { PopupAddFriendComponent } from "../popup-add-friend/popup-add-friend.component";
import { WebSocketService } from '../web-socket.service'
import { ProfileModel} from "../models/profile-model.model";
import { myUser, User} from '../models/user.model';

@Component({
  selector: 'app-info-profil',
  templateUrl: './info-profil.component.html',

  styleUrls: ['./info-profil.component.scss']
  
})
export class InfoProfilComponent implements OnInit {
  Personne!: ProfileModel;
  percentDone!: number;
  uploadSuccess!: boolean;
  matchs !: string[];
  nameProfil !: string;
  userID : number = 0;
  myUserCpy : User = myUser;
  constructor(private webSocketService: WebSocketService, private  dialogRef : MatDialog, @Inject(MAT_DIALOG_DATA) public data : any) {
    this.nameProfil = data.name;

  }

  ngOnInit(): void {
    
    this.Personne = 
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: this.nameProfil,
        Description: "I am Tester and I test things like this website or some other stuffs.",
        date: new Date(),
        victoires: 0,
        match: false
      }
    this.webSocketService.emit("requestUserInfos", this.Personne.Name);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      
      //this.Personne.Name = data.name;
      //this.userID = data.id;
      
    });
    
    this.webSocketService.emit("requestUserMatchHistory", this.Personne.Name);
    this.webSocketService.listen("getMatchHistory").subscribe((userMatchs) => {
      console.log(userMatchs);
      //this.matchs = userMatchs,
    });
    
    this.matchs = [
      "arapaill vs Cgoncalv 1.0",
      "arapaill vs pet 8.9",
    ]

  
  } //end of ngoninit
  
  addToFriends() {
    if (!myUser.friends.has(this.Personne.Name)) {
      myUser.friends.set(this.Personne.Name, this.userID);
      this.myUserCpy.friends = myUser.friends;
    }
    else
      myUser.friends.delete(this.Personne.Name);
    this.webSocketService.emit("updateFriendlist", this.userID);
  }
}
