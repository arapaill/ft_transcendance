import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AppGateway } from './app.gateway';
import { PongModule } from './pong/pong.module';

@Module({
  imports: [ChatModule, PongModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
