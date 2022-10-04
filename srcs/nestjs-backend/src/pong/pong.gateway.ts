import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game, GameState, LeftOrRight } from './pong.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credential: true,
    namespace: 'pong',
  }
})
export class PongGateway {

  private games: any;

  constructor() {
    this.games = new Map();
  }

  @SubscribeMessage('update')
  async handleAction(client: any, payload: any) {
    let socket_id = payload[0].SOCKET;    
    if (this.games.has(socket_id)) {
      if (this.games.get(socket_id).gameState == GameState.MENU) {
        this.games.get(socket_id).changeStateMenu(payload[0]);
        client.emit('update', this.games.get(socket_id).returnGameState());
      }
      else if (this.games.get(socket_id).gameState == GameState.SEARCHING) {
        for (let [key, value] of this.games) {
          if (key != socket_id && value.gameState == GameState.WAITING) {
            this.games.get(key).addPlayer(socket_id, LeftOrRight.RIGHT);
            this.games.set(socket_id, this.games.get(key));
            this.games.get(key).gameState = GameState.MULTI;
          }
          if (this.games.get(socket_id).gameState == GameState.SEARCHING) {
            this.games.get(socket_id).gameState = GameState.WAITING;
            this.games.get(socket_id).addPlayer(socket_id, LeftOrRight.LEFT);
          }
        }
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.SPECTATING) { }
      else if (this.games.get(socket_id).gameState == GameState.OVER) {
        if (payload[0].ACTION == "QUIT") {
          if (this.games.has(socket_id))
            this.games.delete(socket_id);
          this.games.set(socket_id, new Game(socket_id));
          this.games.get(socket_id).gameState = GameState.MENU;
        }
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else {
        if (this.games.get(socket_id).playerTwo != undefined) {
          console.log(this.games.get(socket_id).playerTwo.socket);
        }
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
    }
    else {
      this.games.set(socket_id, new Game(socket_id));
    }
  }
}