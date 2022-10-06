import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { myUser} from './models/user.model';
import { WebSocketService } from './web-socket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'THE AMAZING PONG';
  loc !: string;
  
  constructor(private webSocketService: WebSocketService, private Location:Location, private param: myUser) {}
  userID : number = Number( localStorage.getItem('id'));
  ngOnInit(): void {
    this.loc = this.Location.path();
    if((this.loc.split("id="))[1])
    {
      this.loc = (this.loc.split("id="))[1];
      this.userID = Number(this.loc);
      localStorage.setItem('id', this.loc);
      console.log(this.userID);
  
      this.webSocketService.emit("requestUserInfosID", this.userID);
      this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {

        this.param.avatar = data.avatar;
        this.param.blacklist = data.blacklist;
        this.param.description = data.Description;
        this.param.friends = data.friends;
        this.param.id = data.id;
        this.param.pseudo = data.name;
    });
    console.log("TEST", this.param.pseudo);
   }
    }

    
  }

