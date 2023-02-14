import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserRepository } from 'src/user/user.repository';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { AppService } from 'src/app.service';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name , schema: UserSchema}])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, UserRepository, AppService, JwtService]
})
export class AuthenticationModule {}
