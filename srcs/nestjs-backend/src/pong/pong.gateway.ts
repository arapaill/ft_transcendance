import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game } from './pong.entity';

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
  handleMessage(client: any, payload: any): void {
    console.log(this.game.returnGameState());
    client.emit('update', this.game.returnGameState());
  }
}