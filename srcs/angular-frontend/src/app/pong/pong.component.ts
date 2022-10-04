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
        case 'ControlLeft': {
          socket.emit('update', {
            SOCKET : socket.socket.id,
            ACTION : "GO",
            WIDTH : this.canvas.nativeElement.width,
            HEIGHT : this.canvas.nativeElement.height,
          });
          break ;
        }
        case 'ArrowUp': {
          socket.emit('update', {
            SOCKET : socket.socket.id,
            ACTION : "UP",
            WIDTH : this.canvas.nativeElement.width,
            HEIGHT : this.canvas.nativeElement.height,
          });
          break ;
        }
        case 'ArrowLeft': {
          socket.emit('update', {
            SOCKET : socket.socket.id,
            ACTION : "LEFT",
            WIDTH : this.canvas.nativeElement.width,
            HEIGHT : this.canvas.nativeElement.height,
          });
          break ;
        }
        case 'ArrowRight': {
          socket.emit('update', {
            SOCKET : socket.socket.id,
            ACTION : "RIGHT",
            WIDTH : this.canvas.nativeElement.width,
            HEIGHT : this.canvas.nativeElement.height,
          });
          break ;
        }
        case 'ArrowDown': {
          socket.emit('update', {
            SOCKET : socket.socket.id,
            ACTION : "DOWN",
            WIDTH : this.canvas.nativeElement.width,
            HEIGHT : this.canvas.nativeElement.height,
          });
          break ;
        }
        case 'Escape': {
          socket.emit('update', {
            SOCKET : socket.socket.id,
            ACTION : "QUIT",
            WIDTH : this.canvas.nativeElement.width,
            HEIGHT : this.canvas.nativeElement.height,
          });
          break ;
        }
      }
    })
    this.loop();
  }

  drawCursor(width : number, height : number) {
    if (this.response.MENUSTATE == 0)
      this.pong.ctx.fillRect(width / 5 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
    if (this.response.MENUSTATE == 1)
      this.pong.ctx.fillRect(width / 5 * 2 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
    if (this.response.MENUSTATE == 2)
      this.pong.ctx.fillRect(width / 5 * 3 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
      if (this.response.MENUSTATE == 3)
      this.pong.ctx.fillRect(width / 5 * 4 - width / 15 / 2, height / 4 * 3 + width / 150 / 2, width / 15, width / 150);
  }

  drawOptionCursor(width : number, height : number) {
    console.log(this.response);
    if (this.response.OPTIONSTATE == 0)
      this.pong.ctx.fillRect(width / 6 - width / 15 / 2, height / 3 * 2 + width / 150 / 2, width / 15, width / 150);
    if (this.response.OPTIONSTATE == 1)
      this.pong.ctx.fillRect(width / 6 * 2 - width / 15 / 2, height / 3 * 2 + width / 150 / 2, width / 15, width / 150);
    if (this.response.OPTIONSTATE == 2)
      this.pong.ctx.fillRect(width / 6 * 3 - width / 15 / 2, height / 3 * 2 + width / 150 / 2, width / 15, width / 150);
    if (this.response.OPTIONSTATE == 3)
      this.pong.ctx.fillRect(width / 6 * 4 - width / 15 / 2, height / 3 * 2 + width / 150 / 2, width / 15, width / 150);
    if (this.response.OPTIONSTATE == 4)
      this.pong.ctx.fillRect(width / 6 * 5 - width / 15 / 2, height / 3 * 2 + width / 150 / 2, width / 15, width / 150);
}
  

  drawOption() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.clearRect(0, 0, width, height);
    this.pong.ctx.font = '45px orbitronregular';
    this.pong.ctx.strokeStyle = this.response.COLOR;
    this.pong.ctx.fillStyle = this.response.COLOR;
    this.pong.ctx.strokeRect(25, 25, width - 50, height - 50);
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.fillText("Choose Color", width / 2, height / 3);
    this.pong.ctx.font = '30px orbitronregular';
    this.pong.ctx.fillText("WHITE", width / 6, height / 3 * 2);
    this.pong.ctx.fillText("BLUE", width / 6 * 2 , height / 3 * 2);
    this.pong.ctx.fillText("GREEN", width / 6 * 3, height / 3 * 2);
    this.pong.ctx.fillText("YELLOW", width / 6 * 4, height / 3 * 2);
    this.pong.ctx.fillText("RED", width / 6 * 5, height / 3 * 2);
    this.pong.ctx.font = '15px orbitronregular';
    this.pong.ctx.fillText("Use arrow to change option, and Ctrl to choose. Esc to return to Menu", width / 2, height - 30);
    this.drawOptionCursor(width, height);
  }

  drawMenu() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.clearRect(0, 0, width, height);
    this.pong.ctx.font = '30px orbitronregular';
    this.pong.ctx.strokeStyle = this.response.COLOR;
    this.pong.ctx.fillStyle = this.response.COLOR;
    this.pong.ctx.strokeRect(25, 25, width - 50, height - 50);
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.fillText("SOLO", width / 5, height / 4 * 3);
    this.pong.ctx.fillText("MULTI", width / 5 * 2, height / 4 * 3);
    this.pong.ctx.fillText("SPECTATE", width / 5 * 3, height / 4 * 3);
    this.pong.ctx.fillText("OPTION", width / 5 * 4, height / 4 * 3);
    this.pong.ctx.font = '60px orbitronregular';
    this.pong.ctx.fillText("PONG THE GAME", width / 2, height / 5);
    this.pong.ctx.font = '15px orbitronregular';
    this.pong.ctx.fillText("Use arrow to change option, and Ctrl to choose.", width / 2, height - 30);
    this.pong.ctx.font = '30px orbitronregular';
    this.drawCursor(width, height);
  }

  drawGame() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.font = '30px orbitronregular';
    this.pong.ctx.strokeStyle = this.response.COLOR;
    this.pong.ctx.fillStyle = this.response.COLOR;
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.clearRect(0, 0, width, height);
    for (let i = height / 50; i < height; i += height / 10)
      this.pong.ctx.fillRect(width / 2, i, width / 50, height / 15);
    this.pong.ctx.fillRect(width / 50, this.response.PADDLEONEPOS, width / 50, height / 8);
    this.pong.ctx.fillRect(width / 50 * 48, this.response.PADDLETWOPOS, width / 50, height / 8);
    this.pong.ctx.fillRect(this.response.BALLX, this.response.BALLY, width / 50, width / 50);
    this.pong.ctx.strokeText(this.response.SCORE2, width / 4, height / 10);
    this.pong.ctx.strokeText(this.response.SCORE1, width / 4 * 3, height / 10);
  }

  drawSearching() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.font = '45px orbitronregular';
    this.pong.ctx.strokeStyle = this.response.COLOR;
    this.pong.ctx.fillStyle = this.response.COLOR;
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.clearRect(0, 0, width, height);
    this.pong.ctx.strokeRect(25, 25, width - 50, height - 50);
    this.pong.ctx.fillText("SEARCHING FOR ANOTHER PLAYER", width / 2, height / 2);
  }

  drawWaiting() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.font = '45px orbitronregular';
    this.pong.ctx.strokeStyle = this.response.COLOR;
    this.pong.ctx.fillStyle = this.response.COLOR;
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.clearRect(0, 0, width, height);
    this.pong.ctx.strokeRect(25, 25, width - 50, height - 50);
    this.pong.ctx.fillText("NO PLAYER FOUND", width / 2, height / 2)
    this.pong.ctx.fillText("WAITING FOR ANOTHER PLAYER\n.....", width / 2, height / 2 + 50);
  }

  drawOver() {
    let width = this.canvas.nativeElement.width;
    let height = this.canvas.nativeElement.height;
    this.pong.ctx.font = '45px orbitronregular';
    this.pong.ctx.strokeStyle = this.response.COLOR;
    this.pong.ctx.fillStyle = this.response.COLOR;
    this.pong.ctx.textAlign = "center";
    this.pong.ctx.clearRect(0, 0, width, height);
    this.pong.ctx.strokeRect(25, 25, width - 50, height - 50);
    this.pong.ctx.fillText("WINNER IS", width / 2, height / 2)
    this.pong.ctx.fillText(this.response.WINNER, width / 2, height / 2 + 50);
    this.pong.ctx.font = '15px orbitronregular';
    this.pong.ctx.fillText("Press Esc to quit", width / 2, height - 30);
  }
  
  async update() {
    console.log(socket.socket.id);
    socket.emit('update', {
      SOCKET : socket.socket.id,
      ACTION : undefined,
      HEIGHT : this.canvas.nativeElement.height,
      WIDTH : this.canvas.nativeElement.width,
    });
    socket.listen('update').subscribe((val : any) => {
      this.response = val;
    });
    console.log(this.response);
    if (this.response.GAMESTATE == 0)
      this.drawMenu();
    if (this.response.GAMESTATE == 1 || this.response.GAMESTATE == 2)
      this.drawGame();
    if (this.response.GAMESTATE == 3)
      this.drawSearching();
    if (this.response.GAMESTATE == 4)
      this.drawWaiting();
    if (this.response.GAMESTATE == 6)
      this.drawOver();
    if (this.response.GAMESTATE == 8)
      this.drawOption();
  }
  
  
  loop() {
    this.update();
    requestAnimationFrame(this.loop.bind(this));
  }
}
