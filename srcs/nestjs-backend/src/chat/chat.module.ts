import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [ChatService],
	exports: [ChatService]
})
export class ChatModule {}