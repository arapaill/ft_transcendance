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


@Module({
	imports: [
		JwtModule.register({
		  secret: 'b91fac0cfb65c4faa4714dd585045707c649e26f1149ca2afbb078f0d165b2bc',
		//   signOptions: { expiresIn: '7d' },
		}),
		PassportModule,
		PrismaModule,
		// UserService,

	  ],
	providers: [ 
		UserService,
		SessionSerializer,
		// LocalStrategy,
	// JwtStrategy,
	PassportModule , FortyTwoStrategy , AuthService],
	exports: [ PassportModule ,AuthService , FortyTwoStrategy],
	controllers: [AuthController],
})
export class AuthModule{}
