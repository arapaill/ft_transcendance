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
  matchs !: string[];
  nameProfil !: string;
  constructor(private webSocketService: WebSocketService, private  dialogRef : MatDialog, @Inject(MAT_DIALOG_DATA) public data : any, public myUser : myUser, public dude : myUser) {
    this.nameProfil = data.name;

  }

  ngOnInit(): void {
    
    this.webSocketService.emit("requestUserInfos", this.nameProfil);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      this.dude.avatar = data.avatar;
      this.dude.pseudo = data.name;
      this.dude.description = data.Description;
      this.dude.id = data.id;

      this.Personne = 
      {
        avatar: this.dude.avatar,
        name:  this.dude.pseudo,
        description: this.dude.description,
        date: new Date(),
        victoires: 0,
        match: false,
        id :this.dude.id
      }
    });
 
    
    this.webSocketService.emit("requestUserMatchHistory", this.Personne.name);
    this.webSocketService.listen("getMatchHistory").subscribe((userMatchs : any) => {
      console.log(userMatchs);
      this.matchs = userMatchs;
    });
    

  
  } //end of ngoninit
  
  addToFriends() {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.blacklist = data.blacklist;
      this.myUser.id = data.id;
      data.friends.forEach((key : any, value : any) : any =>{
        this.myUser.friends.push(value, key);
      });
    
    if (!this.myUser.friends.indexOf(this.Personne.id)) {
      this.myUser.friends.push(this.Personne.id);
    }
    else
      {
        let ret = this.myUser.friends.indexOf(this.Personne.id)
        this.myUser.friends.splice(ret, 1);
      }
    this.webSocketService.emit("updateUser", this.myUser);
    console.log(this.myUser);
  });
  }

}
