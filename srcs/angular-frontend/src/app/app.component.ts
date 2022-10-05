import { Component, OnInit } from '@angular/core';
import { myUser, User } from './models/user.model';
import { WebSocketService } from './web-socket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  myUserCpy : User = myUser;
  title = 'angular-frontend';
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    }
  }

