// import { Module } from '@nestjs/common';

// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { FortyTwoStrategy } from './strategies/42.strategy';


import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './strategy/42.strategy';
import { AuthController } from './auth.controller';
// import { JwtStrategy} from './strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { SessionSerializer } from "./session.serializer"
// import { LocalStrategy  } from "./strategy/local.strategy"
import { AuthGateway } from './auth.gateway';


@Module({
	imports: [
		JwtModule.register({
		  secret: '2adb6038a9d246fd31bedf11ca301e8864d8fc23809ac3fd7a0dbd114644f57f',
		//   signOptions: { expiresIn: '7d' },
		}),
		PassportModule,
		PrismaModule,
		// UserService,

	  ],
	controllers: [AuthController],
		providers: [ 
		UserService,
		SessionSerializer,
		// LocalStrategy,
	// JwtStrategy,
	PassportModule , FortyTwoStrategy , AuthService],
	exports: [ PassportModule ,AuthService , FortyTwoStrategy],
})
export class AuthModule{}
