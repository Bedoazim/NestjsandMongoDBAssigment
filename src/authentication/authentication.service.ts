import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthenticationService {

  constructor(private readonly userRepository: UserRepository) {}

  async checkUserAuthorityByEmail(
    email: string,
    password: string,
  ): Promise<User> | null {
    const user = await this.userRepository.findOne({
      email: email,
    });
    
    if (user == null || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return user;
  }
}
