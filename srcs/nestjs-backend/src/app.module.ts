import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { AppGateway } from './app.gateway';
import { PongModule } from './pong/pong.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { FortyTwoStrategy } from './auth/strategy/42.strategy';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';
import { AuthGateway } from './auth/auth.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
	imports: [
		PongModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			username: 'jandre',
			password: 'jandrepass',
			database: 'transcendance',
			entities: [Chat],
			synchronize: false,
		}),
		TypeOrmModule.forFeature([Chat]),
		AuthModule,
		UserModule,
		PrismaModule,
		ChatModule
	  ],
	controllers: [
	  AppController
	  ],
	providers: [
	  	AppService,
	  	AuthGateway,
		ChatGateway,
		FortyTwoStrategy,
	  ],
  })
  export class AppModule {}
