import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    alert("OK");
    return 'Hello world!';
  }
}
