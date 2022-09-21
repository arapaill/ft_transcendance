import { Component, OnInit, Input } from '@angular/core';
import { ProfileModel} from "../models/profile-model.model"
import { MatDialog } from  '@angular/material/dialog';
import { PopupModifierProfilComponent } from '../popup-modifier-profil/popup-modifier-profil.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private  dialogRef : MatDialog){}

  ngOnInit(): void {

  }
  openDialog(){
    this.dialogRef.open(PopupModifierProfilComponent);
  }

}
