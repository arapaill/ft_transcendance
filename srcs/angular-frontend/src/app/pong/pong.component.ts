import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../web-socket.service';


function drawMenu(ctx : CanvasRenderingContext2D) {
  ctx.font = '30px orbitronregular';
  ctx.strokeStyle = 'white';
  ctx.strokeRect(25, 25, 1150, 550);
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
}

class PongMenu {
  
  private canvas : ElementRef<HTMLCanvasElement>;
  private ctx : CanvasRenderingContext2D;
  constructor(Canvas : ElementRef<HTMLCanvasElement>) {
    this.canvas = Canvas;
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    drawMenu(this.ctx)
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
  
  private ctx!: CanvasRenderingContext2D;
  
  draw_rect(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }
  
  
  ngOnInit(): void {
    let menu = new PongMenu(this.canvas);
    document.addEventListener("keydown", function(e) {
      let socket = new WebSocketService;
      switch(e.code) {
        case 'ArrowUp': {
          socket.emit('message', {data : "ok"});
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
  }
}
