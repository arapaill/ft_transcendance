import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Pong } from './Pong'


let socket = new WebSocketService;

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef = {} as ElementRef;
  pong!: Pong;

  constructor(private webSocketServive: WebSocketService) {}

  ngOnInit(): void {
    this.pong = new Pong(this.canvas);
    document.addEventListener("keydown", function(e) {
      switch(e.code) {
        case 'ArrowUp': {
          console.log("up");
          break ;
        }
        case 'ArrowLeft': {
          console.log("left");
          break ;
        }
        case 'ArrowRight': {
          console.log("right");
          break ;
        }
        case 'ArrowDown': {
          console.log("down");
          break ;
        }
      }
    });

    this.loop();
  }

  loop() {
    let state: any;
    console.log("get in the looop");
    console.log("menu draw");
    this.pong.ctx.font = '30px orbitronregular';
    this.pong.ctx.strokeStyle = 'white';
    this.pong.ctx.strokeRect(25, 25, 1150, 550);
    this.pong.ctx.fillStyle = "red";
    this.pong.ctx.textAlign = "center";
    requestAnimationFrame(this.loop.bind(this));
    this.webSocketServive.emit('update', {data : "ok"});
    socket.listen('update').subscribe((val : any) => {
      state = val;
    });
  }
}
