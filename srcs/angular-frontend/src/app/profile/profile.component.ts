import { Component, OnInit, Input } from '@angular/core';
import { myUser, User} from '../models/user.model';
import { MatDialog } from  '@angular/material/dialog';
import { PopupModifierProfilComponent } from '../popup-modifier-profil/popup-modifier-profil.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user : User = myUser;
  constructor(private  dialogRef : MatDialog){}

  ngOnInit(): void {

  }
  openDialog(){
    let ret = this.dialogRef.open(PopupModifierProfilComponent);
    ret.afterClosed().subscribe(result=>{
      myUser.pseudo = result.Nom;
      myUser.description = result.Description;
      this.user = myUser;
    })
  }

}
