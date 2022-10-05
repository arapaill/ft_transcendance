import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile-model.model';
import { MatDialog } from  '@angular/material/dialog';
import { InfoProfilComponent } from '../info-profil/info-profil.component';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent implements OnInit {
  @Input() profils!: ProfileModel[];

  constructor(private  dialogRef : MatDialog ,private webSocketService:WebSocketService){}

  ngOnInit(): void {
     this.webSocketService.listen("getTopFive").subscribe((top) => {
      console.log(top);
    });
    /*
      this.profils = [
        {
          avatar: top[0].avatar,
          Name: top[0].name,
          Description: top[0].description,
          date: top[0].date,
          victoires : top[0].victory,
        },
        {
          avatar: top[1].avatar,
          Name: top[1].name,
          Description: top[1].description,
          date: top[1].date,
          victoires : top[1].victory,
        },
        {
          avatar: top[2].avatar,
          Name: top[2].name,
          Description: top[2].description,
          date: top[2].date,
          victoires : top[2].victory,
        },
        {
          avatar: top[3].avatar,
          Name: top[3].name,
          Description: top[3].description,
          date: top[3].date,
          victoires : top[3].victory,
        },
        {
          avatar: top[4].avatar,
          Name: top[4].name,
          Description: top[4].description,
          date: top[4].date,
          victoires : top[4].victory,
        }
      ]
    */
    this.profils = [
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "User",
        Description: "I am the User and I am real",
        date: new Date(),
        victoires : 9001,
        match: false
      },
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "LOLZ",
        Description: "troll",
        date: new Date(),
        victoires: 9,
        match: true
      },
      
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "Tester 2",
        Description: "I am Tester and I test things like this website or some other stuffs.",
        date: new Date(),
        victoires: 7,
        match: true
      },
      {
        avatar: 'assets/avatar-placeholder-1.png',
        avatarName: 'avatar-placeholder-1',
        Name: "Tester",
        Description: "I am Tester and I test things like this website or some other stuffs.",
        date: new Date(),
        victoires: 0,
        match: true
      }
    ]

  }
  openDialog(nom: string){
    this.dialogRef.open(InfoProfilComponent,{
      data : {
        name : nom,
      }
    });
  }

}
