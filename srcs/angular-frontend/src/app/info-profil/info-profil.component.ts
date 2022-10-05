import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { PopupAddFriendComponent } from "../popup-add-friend/popup-add-friend.component";
import { WebSocketService } from '../web-socket.service'
import { ProfileModel} from "../models/profile-model.model";

@Component({
  selector: 'app-info-profil',
  templateUrl: './info-profil.component.html',

  styleUrls: ['./info-profil.component.scss']
  
})
export class InfoProfilComponent implements OnInit {
  @Input() Personne!: ProfileModel;
  @Input() User! : ProfileModel;
  percentDone!: number;
  uploadSuccess!: boolean;
  matchs !: string[];
  name !: string;
  i : number = 0;
  constructor(private webSocketService: WebSocketService, private  dialogRef : MatDialog, @Inject(MAT_DIALOG_DATA) public data : any) {
    this.name = data.name;
  }

  ngOnInit(): void {
    this.webSocketService.emit("getUserMatchHistory", this.name);
    this.webSocketService.listen("getMatchHistory").subscribe((userMatchs) => {
      console.log(userMatchs);
      //this.matchs = userMatchs,
    });
    this.webSocketService.emit("getUserInfos", this.name);
    this.webSocketService.listen("getInfos").subscribe((profil) => {
      console.log(profil);
    });
    this.matchs = [
      "arapaill vs Cgoncalv 1.0",
      "arapaill vs pet 8.9",
    ]
    this.Personne = 
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "Tester",
        Description: "I am Tester and I test things like this website or some other stuffs.",
        date: new Date(),
        victoires: 0,
        match: false
      }
  }
  
  openDialog(){
    this.dialogRef.open(PopupAddFriendComponent,{
      data : {
        name : 'Tester'
      }
    });
  }
}
