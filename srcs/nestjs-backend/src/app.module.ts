import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { AppGateway } from './app.gateway';
import { PongModule } from './pong/pong.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { FortyTwoStrategy } from './auth/strategy/42.strategy';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
	//ChatModule, 
	//PongModule,
	TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'postgres',
		username: 'jandre',
		password: 'jandrepass',
		database: 'transcendance',
		entities: [Chat],
		synchronize: false,
	}),
	TypeOrmModule.forFeature([Chat]),
	AuthModule,
 	UserModule,
 	PrismaModule
	],
  controllers: [
	AppController
	],
  providers: [
	AppService,
  	AppGateway,
  	ChatGateway,
  	FortyTwoStrategy
	],
})
export class AppModule {}
