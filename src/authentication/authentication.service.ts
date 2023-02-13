import { Injectable } from '@nestjs/common';
import { LoginInputDto } from './dto/loginInput.dto';
import { RegisterInputDto } from './dto/registerInput.dto';


@Injectable()
export class AuthenticationService {

  register(registerInputDto : RegisterInputDto) {
    return;
  }

  login(loginInputDto : LoginInputDto) : string {
    const token = "";
    return token;    
  }

}
