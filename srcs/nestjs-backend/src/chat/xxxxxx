import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatGateway } from './chat.gateway';

@Module({
	imports: [
		TypeOrmModule.forRoot({
		  type: 'postgres',
		  host: 'postgres_container',
		  username: 'jandre',
		  password: 'jandrepass',
		  database: 'chat',
		  entities: [Chat],
		  synchronize: true,
		}),
		TypeOrmModule.forFeature([Chat]),
	],
	controllers: [],
	providers: [ChatGateway],
})
export class ChatModule {}