import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';
import { PopupAddFriendComponent } from "../popup-add-friend/popup-add-friend.component"
import { ProfileModel} from "../models/profile-model.model"

@Component({
  selector: 'app-info-profil',
  templateUrl: './info-profil.component.html',
  styleUrls: ['./info-profil.component.scss']
})
export class InfoProfilComponent implements OnInit {
  @Input() Personne!: ProfileModel;
  @Input() User! : ProfileModel;
  constructor(private  dialogRef : MatDialog){}

  ngOnInit(): void {
    this.Personne = 
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "Tester",
        Description: "I am Tester and I test things like this website or some other stuffs.",
        date: new Date(),
        victoires: 0,
        match: true
        
      }
      this.User =
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "User",
        Description: "I am the User and I am real",
        date: new Date(),
        victoires : 9999,
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
