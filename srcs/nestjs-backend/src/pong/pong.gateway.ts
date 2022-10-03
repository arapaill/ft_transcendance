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
  async handleupdate(client: any, payload: any) {
   // if (payload.TYPE == "ACTION") {
     // if (this.game.returnGameState() == "MENU")
       // this.game.changeStateMenu(payload);
   // }
   // if (payload.TYPE == "UPDATE")
      client.emit('update', this.game.returnGameState());

  }

  @SubscribeMessage('action')
  async handleAction(client: any, payload: any) {
    if (this.game.returnGameState().GAMESTATE == GameState.MENU)
      this.game.changeStateMenu(payload[0]);
  }
}