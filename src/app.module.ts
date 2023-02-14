import { Module , NestModule , MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { JwtVerifierMiddleware } from './jwtverifier.middleware';
import { UserRepository } from './user/user.repository';
import { User, UserSchema } from './user/entities/user.entity';
import { JwtService } from '@nestjs/jwt/dist';


@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Users'),
    UserModule,
    MongooseModule.forFeature([{name: User.name , schema: UserSchema}])
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, JwtService],

})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtVerifierMiddleware)
      .forRoutes(UserController);
  }
}
