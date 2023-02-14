import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const dotenv = require('dotenv');
  dotenv.config();
  app.useGlobalPipes(
    new ValidationPipe({disableErrorMessages: false}),
  );
  await app.listen(process.env.myPort || process.env.PORT);
}
bootstrap();
