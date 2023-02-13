import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthenticationModule, MongooseModule.forRoot('mongodb://localhost/admin')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
