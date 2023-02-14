import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterInputDto } from './dto/register-input.dto';
import { LoginInputDto } from './dto/login-input.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async register(@Body() RegisterInputDto: RegisterInputDto, @Res() res) {
    try {
      await this.userService.createUser(RegisterInputDto);
      res.send('Registered Successfully');
    } catch (error) {
      if (error.code == 11000) {
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'This data is already in use',
          Data: error.keyValue,
        });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in the database');
      }
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async login(@Body() loginInputDto: LoginInputDto, @Res() res) {
    try {

      const user = await this.authenticationService.checkUserAuthorityByEmail(loginInputDto.email, loginInputDto.password);

      if (user == null) {
        res.status(HttpStatus.UNAUTHORIZED).send('Wrong Credentials');
        return;
      }
      
      const token = this.jwtService.sign({id: user["_id"]}, {secret: process.env.JwtSecretKey, expiresIn: '12h' } );

      res.setHeader("access-token", token);

      res.send(
        "Logged In Successfully\n An access-token has been generated and sent in the header",
      );
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
        console.log(error);
    }
  }
}
