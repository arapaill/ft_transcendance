import { Module } from '@nestjs/common';
import { PongController } from './pong.controller';
import { PongGateway } from './pong.gateway';
import { PongService } from './pong.service';

@Module({
  controllers: [PongController],
  providers: [PongService, PongGateway]
})
export class PongModule {}
