import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game, GameState } from './pong.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credential: true,
    namespace: 'pong',
  }
})
export class PongGateway {

  private games;

  constructor() {
    this.games = new Map();
  }

  @SubscribeMessage('update')
  async handleAction(client: any, payload: any) {
    console.log(payload[0]);
    console.log(this.games.get(payload[0].SOCKET).returnGameState());
    if (this.games.has(payload[0].SOCKET)) {
      if (this.games.get(payload[0].SOCKET).returnGameState().GAMESTATE == GameState.MENU) {
        this.games.get(payload[0].SOCKET).changeStateMenu(payload[0]);
        client.emit('update', this.games.get(payload[0].SOCKET).returnGameState());
      }
      else {
        this.games.get(payload[0].SOCKET).update(payload[0]);
        client.emit('update', this.games.get(payload[0].SOCKET).returnData());
      }
    }
    else {
      this.games.set(payload[0].SOCKET, new Game(payload[0].SOCKET))
      client.emit('update', this.games.get(payload[0].SOCKET).returnGameState());
    }
  }
}