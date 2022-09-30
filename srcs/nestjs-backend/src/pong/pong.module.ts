import { Module } from '@nestjs/common';
import { PongController } from './pong.controller';
import { PongGateway } from './pong.gateway';

@Module({
  controllers: [PongController],
  providers: [PongGateway]
})
export class PongModule {}
