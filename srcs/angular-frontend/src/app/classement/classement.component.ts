import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile-model.model';
import { MatDialog } from  '@angular/material/dialog';
import { InfoProfilComponent } from '../info-profil/info-profil.component';
import { WebSocketService } from '../web-socket.service';
import { myUser } from '../models/user.model';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent implements OnInit {
  @Input() profils: ProfileModel[] = [];

  constructor(private  dialogRef : MatDialog ,private webSocketService:WebSocketService, public myUser : myUser){}

  ngOnInit(): void {
    this.myUser.id = Number(localStorage.getItem('id'));

    this.profils = [];
    this.webSocketService.emit("requestTopFiveUsers", undefined);
     this.webSocketService.listen("getTopFive").subscribe((top : any) => {
      console.log(top);
      for (const i of top) {
       
          let profil : ProfileModel = 
          { 
            avatar: i.avatar,
            name: i.name,
            description: i.Description,
            date: i.date,
            victoires : i.wins,
            match : i.match,
            id: i.id,
            status: i.line_status,
          }
          this.profils.push(profil);
      
        
      }
    });
    

  }
  openDialog(nom: string){
    this.dialogRef.open(InfoProfilComponent,{
      data : {
        name : nom,
      }
    });
  }

}
