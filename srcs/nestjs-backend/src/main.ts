import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as passport from "passport";

var session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
app.use(
    session({
      secret: '2adb6038a9d246fd31bedf11ca301e8864d8fc23809ac3fd7a0dbd114644f57f',
      resave: false,
      saveUninitialized: true,
    })
  )

	app.use(passport.initialize())
	app.use(passport.session())
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  await app.listen(3000);
}
bootstrap();