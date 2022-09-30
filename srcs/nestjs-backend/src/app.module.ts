import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PongModule } from './pong/pong.module';

@Module({
  imports: [ChatModule, PongModule],
})
export class AppModule {}
