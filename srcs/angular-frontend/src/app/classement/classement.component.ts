import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile-model.model';
import { MatDialog } from  '@angular/material/dialog';
import { InfoProfilComponent } from '../info-profil/info-profil.component';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent implements OnInit {
  @Input() profils!: ProfileModel[];

  constructor(private  dialogRef : MatDialog){}

  ngOnInit(): void {
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
  openDialog(){
    this.dialogRef.open(InfoProfilComponent);
  }

}
