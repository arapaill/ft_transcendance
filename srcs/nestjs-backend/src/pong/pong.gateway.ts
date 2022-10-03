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

  private games: any;

  constructor() {
    this.games = new Map();
  }

  @SubscribeMessage('update')
  async handleAction(client: any, payload: any) {
    let socket_id = payload[0].SOCKET;    
    if (this.games.has(socket_id)) {
      if (this.games.get(socket_id).returnGameState().GAMESTATE == GameState.MENU) {
        this.games.get(socket_id).changeStateMenu(payload[0]);
        client.emit('update', this.games.get(socket_id).returnGameState());
      }
      else {
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
    }
    else {
      this.games.set(socket_id, new Game(socket_id));
    }
  }
}