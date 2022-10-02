import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../web-socket.service';


let socket = new WebSocketService;

function drawMenu(ctx : CanvasRenderingContext2D) {
  console.log("menu draw");
  ctx.font = '30px orbitronregular';
  ctx.strokeStyle = 'white';
  ctx.strokeRect(25, 25, 1150, 550);
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
}

class Pong {
  
  private canvas : ElementRef<HTMLCanvasElement>;
  private ctx : CanvasRenderingContext2D;
  constructor(Canvas : ElementRef<HTMLCanvasElement>) {
    this.canvas = Canvas;
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
  }
  loop() {
    let state : any;
    console.log("get in the looop");
    this.ctx.font = '30px orbitronregular';
    this.ctx.strokeStyle = 'white';
    this.ctx.strokeRect(25, 25, 1150, 550);
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    //drawMenu(this.ctx);
    //socket.emit('update', {data : "ok"});
    //socket.listen('update').subscribe((val : any) => {
    //   state = val;
    //});
    //if (state.MENUSTATE == 0)
    {
    }
  }
}

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})


export class PongComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    let pong = new Pong(this.canvas);
    let data : any;
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
    requestAnimationFrame(pong.loop);
  }
}
