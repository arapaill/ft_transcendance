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

  private game : Game;

  constructor() {
    this.game = new Game;
  }

  @SubscribeMessage('update')
  async handleAction(client: any, payload: any) {
    if (this.game.returnGameState().GAMESTATE == GameState.MENU) {
      this.game.changeStateMenu(payload[0]);
      client.emit('update', this.game.returnGameState());
    }
    else {
      this.game.update(payload[0]);
      client.emit('update', this.game.returnData());
    }
  }
}