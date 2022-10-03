import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { Pong } from './Pong'


let socket : WebSocketService;
socket = new WebSocketService;


@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef = {} as ElementRef;
  pong!: Pong;
  response : any;
  state! : string;
  
  constructor(private webSocketService: WebSocketService, private renderer : Renderer2) {
    this.state = "MENU";
  }
  
  ngOnInit(): void {
    this.pong = new Pong(this.canvas);
  }
  
  ngAfterViewInit() : any {
    this.renderer.listen('document', 'keydown', (e : any) => {
      let state: any;
      switch(e.code) {
        case 'ArrowUp': {
          socket.emit('action', {
            ACTION : "UP",
          });
          this.update();
          break ;
        }
        case 'ArrowLeft': {
          socket.emit('action', {
            ACTION : "LEFT",
          });
          this.update();
          break ;
        }
        case 'ArrowRight': {
          socket.emit('action', {
            ACTION : "RIGHT",
          });
          this.update();
          break ;
        }
        case 'ArrowDown': {
          socket.emit('action', {
            ACTION : "DOWN",
          });
          this.update();
          break ;
        }
      }
    })
    this.loop();
  }

  drawCursor(width : number, height : number) {
    if (this.response.MENUSTATE == 0)
      this.pong.ctx.fillRect(width / 4 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
    if (this.response.MENUSTATE == 1)
      this.pong.ctx.fillRect(width / 4 * 2 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
    if (this.response.MENUSTATE == 2)
      this.pong.ctx.fillRect(width / 4 * 3 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
  }


  drawMenu() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.clearRect(0, 0, width, height);
    this.pong.ctx.font = '30px orbitronregular';
    this.pong.ctx.strokeStyle = 'white';
    this.pong.ctx.strokeRect(25, 25, 1150, 550);
    this.pong.ctx.fillStyle = "red";
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.fillText("SOLO", width / 4, height / 4 * 3);
    this.pong.ctx.fillText("MULTI", width / 4 * 2, height / 4 * 3);
    this.pong.ctx.fillText("OPTION", width / 4 * 3, height / 4 * 3);
    this.drawCursor(width, height);
  }
  
  async update() {
    socket.emit('update', {
      TYPE : "UPDATE",
      STATE : this.state,
    });
    socket.listen('update').subscribe((val : any) => {
      this.response = val;
    });
    if (this.response.GAMESTATE == 0)
      this.drawMenu();
  }
  
  
  loop() {
    this.update();
    requestAnimationFrame(this.loop.bind(this));
  }
}
