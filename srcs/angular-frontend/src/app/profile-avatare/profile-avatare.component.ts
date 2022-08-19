import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-avatare',
  templateUrl: './profile-avatare.component.html',
  styleUrls: ['./profile-avatare.component.scss']
})
export class ProfileAvatareComponent implements OnInit {

  imgSrc!: string;
  title!: string;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = 'assets/avatar-placeholder-1.png';
    this.title = "avatar-placeholder-1"
  }

}
