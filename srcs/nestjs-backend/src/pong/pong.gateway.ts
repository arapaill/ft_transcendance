import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(3000)
export class PongGateway {
  @SubscribeMessage('update')
  handleMessage(client: any, payload: any): string {
    console.log("toto");
    return 'Hello world!';
  }
}