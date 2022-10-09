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
  matchs : string[] = [];
  nameProfil !: string;
  constructor(private webSocketService: WebSocketService, private  dialogRef : MatDialog, @Inject(MAT_DIALOG_DATA) public data : any, public myUser : myUser) {
    this.nameProfil = data.name;

  }

  ngOnInit(): void {
    this.myUser.id = Number(localStorage.getItem('id'));
    
    this.webSocketService.emit("requestUserInfos", this.nameProfil);
    this.webSocketService.listen("getUserInfos").subscribe((data: any) => {
      this.Personne = 
      {
        avatar: data.avatar,
        name:  data.name,
        description: data.Description,
        date: new Date(),
        victoires: data.wins,
        match: data.match,
        id :data.id,
        status: data.line_status,
      }
    this.webSocketService.emit("requestUserMatchsHistory", this.Personne.name);
    this.webSocketService.listen("getUserMatchsHistory").subscribe((userMatchs : any) => {
      this.matchs = [];
      for (const iterator of userMatchs) {
        let match : string = iterator.JOUEUR_1 + " vs " + iterator.JOUEUR_2;
        this.matchs.push(match);
      }
    });
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
      this.myUser.friends = data.friendsList;
    this.webSocketService.emit("updateFriendlist", {
      myID : Number(localStorage.getItem('id')),
      friendID : this.Personne.id,
    });
    console.log(this.myUser);
  });
  }

}
