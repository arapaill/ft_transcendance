import { Component, OnInit, Input } from '@angular/core';
import { ProfileModel} from "../models/profile-model.model"

@Component({
  selector: 'app-info-profil',
  templateUrl: './info-profil.component.html',
  styleUrls: ['./info-profil.component.scss']
})
export class InfoProfilComponent implements OnInit {
  @Input() Personne!: ProfileModel;
  imgSrc!: string;
  title!: string;
  constructor() { }

  ngOnInit(): void {
    this.Personne = 
      {
        Name: "Tester",
        Description: "I am Tester and I test things like this website or some other stuffs.",
        date: new Date(),
        victoires: 0
        
      }
      this.imgSrc = 'assets/avatar-placeholder-1.png';
      this.title = "avatar-placeholder-1"
  }
}
