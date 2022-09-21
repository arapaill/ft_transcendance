import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(3000)
export class PongGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    alert("TOP");
    return 'Hello world!';
  }
}
