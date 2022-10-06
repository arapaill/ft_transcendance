import { Module } from '@nestjs/common';
import { PongController } from './pong.controller';
import { PongGateway } from './pong.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PongController],
  providers: [PongGateway, PrismaService]
})
export class PongModule {}
