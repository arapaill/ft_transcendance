import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {
  imgSrc!: string;
  title!: string;

  constructor() { }

  ngOnInit(): void {
    this.imgSrc = 'assets/pong-placeholder.png';
    this.title = "pong-placeholder"
  }

}
