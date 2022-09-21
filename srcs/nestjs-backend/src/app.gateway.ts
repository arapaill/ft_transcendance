import { WebSocketServer } from '@nestjs/websockets';
import { MessageBody } from '@nestjs/websockets';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credential: true,
  }
})
export class AppGateway {
  @WebSocketServer(4200)
  server : Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any): string {
    console.log("DODODODO");
    alert("ok");
    return 'Hello worldqsqsq!';
  }
}
