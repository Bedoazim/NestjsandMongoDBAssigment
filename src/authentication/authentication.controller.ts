import { Controller, Req, Get, Post, Body, Patch, Param, Delete, Res, Header, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterInputDto } from './dto/registerInput.dto';
import { LoginInputDto } from './dto/loginInput.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  
  @Post('register')
  
  @HttpCode(HttpStatus.CREATED)

  @UsePipes(ValidationPipe)

  register (@Body() RegisterInputDto : RegisterInputDto , @Res() res ) {

    this.authenticationService.register(RegisterInputDto)

    return "Registered Successfully";
  }
  

  
  @Post('login')

  @HttpCode(HttpStatus.OK)

  @UsePipes(ValidationPipe)

  login (@Body() LoginInputDto : LoginInputDto, @Res() res) {

    const token : string = this.authenticationService.login(LoginInputDto);
    
    res.setHeader("x-token" , token);
    
    return "An 'x-token' has been generated and sent in the header";
  }

}