import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';



@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appService: AppService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await this.appService.hashPassword(
      createUserDto.password,
    );
    const newUser = await this.userRepository.create(createUserDto);

    return newUser;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) : Promise<Boolean> {


    const user = await this.userRepository.findOne({
      _id: id,
    });

    if (user == null || !await bcrypt.compare(updateUserDto.password,user.password)) {
      return false;
    }

    const updatedUser : User = {

      name : (updateUserDto.name != null ? updateUserDto.name : user.name),
      email: (updateUserDto.email != null ? updateUserDto.email : user.email),
      phoneNumber: (updateUserDto.phoneNumber != null ? updateUserDto.phoneNumber : user.phoneNumber),
      password:  user.password,
      addressBook: user.addressBook
    } 

    await this.userRepository.findOneAndUpdate({
      _id: id,
    }, updatedUser);

    return true;
    
  }

  async changeUserPassword(
    changeUserPasswordDto: ChangeUserPasswordDto,
    id: string,
  ): Promise<Boolean> {

    const user = await this.userRepository.findOne({
      _id: id,
    });

    if (user == null || !await bcrypt.compare(changeUserPasswordDto.oldPassword,user.password)) {
      return false;
    }

    changeUserPasswordDto.newPassword = await this.appService.hashPassword(
      changeUserPasswordDto.newPassword,
    );

    await this.userRepository.findOneAndUpdate({
      _id: id,
    }, {password : changeUserPasswordDto.newPassword});

    return true;
  }

}
