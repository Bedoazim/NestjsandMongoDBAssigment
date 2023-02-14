import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { AppService } from 'src/app.service';
import { UserAddressBookService } from './user-addressbook.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name , schema: UserSchema}]), JwtModule.register({
    secret: process.env.JwtSecretKey,
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [UserController],
  providers: [UserService, UserRepository, AppService, UserAddressBookService]
})
export class UserModule {}
