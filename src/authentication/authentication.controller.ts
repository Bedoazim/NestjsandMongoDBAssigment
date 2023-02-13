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
import { RegisterInputDto } from './dto/registerInput.dto';
import { LoginInputDto } from './dto/loginInput.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  register(@Body() RegisterInputDto: RegisterInputDto, @Res() res) {
    this.authenticationService.register(RegisterInputDto);

    res.send('Registered Successfully');
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  login(@Body() loginInputDto: LoginInputDto, @Res() res) {
    const token: string = this.authenticationService.login(loginInputDto);

    res.setHeader('x-token', token);

    res.send("An 'x-token' has been generated and sent in the header");
  }
}
