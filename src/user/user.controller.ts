import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AddAddressBookEntryDto } from './dto/add-addressBook-entry.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { DeleteAddressBookEntryDto } from './dto/delete-addressBook-entry.dto';
import { UpdateAddressBookEntryDto } from './dto/update-addressBook-entry.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressBookEntry } from './entities/addressBookEntry.entity';
import { UserAddressBookService } from './user-addressbook.service';
const ID = '63eb742ee6642bfd86c51495';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressBookService: UserAddressBookService,
  ) {}

  @Post('updateInfo')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async updateInfo(@Body() updateUserDto: UpdateUserDto, @Res() res) {
    try {
      
      const updatedUserInfo: Boolean = await this.userService.updateUser(
        updateUserDto,
        updateUserDto['id'],
      );

      if (!updatedUserInfo) {
        res.status(HttpStatus.UNAUTHORIZED).send('Wrong Password');
        return;
      }

      res.send('Info updated Successfully');
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
    }
  }

  @Post('changePassword')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async changePassword(
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
    @Res() res,
  ) {
    try {

      const changedPassword: Boolean =
        await this.userService.changeUserPassword(changeUserPasswordDto, changeUserPasswordDto['id']);

      if (!changedPassword) {
        res.status(HttpStatus.UNAUTHORIZED).send('Wrong Password');
        return;
      }

      res.send('Password changed Successfully');
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
    }
  }

  @Get('getAddressBook')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async getAddressBook(@Body() body: any,@Res() res) {
    try {

      const addressBook: AddressBookEntry[] =
        await this.userAddressBookService.getAddressBook(body['id']);

      res.send({
        TheAddressBook: addressBook,
      });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
    }
  }

  @Post('addAddress')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async addAddress(
    @Body() addAddressBookEntryDto: AddAddressBookEntryDto,
    @Res() res,
  ) {
    try {

      await this.userAddressBookService.addAddressBookEntry(
        addAddressBookEntryDto,
        addAddressBookEntryDto['id'],
      );

      res.send('Address Added Successfully');
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
    }
  }

  @Post('updateAddress')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async updateAddress(
    @Body() updateAddressBookEntryDto: UpdateAddressBookEntryDto,
    @Res() res,
  ) {
    try {
      const id = ID;

      const updated = await this.userAddressBookService.updateAddressBookEntry(
        updateAddressBookEntryDto,
        updateAddressBookEntryDto['id'],
        updateAddressBookEntryDto.addressId,
      );

      if (!updated) {
        res.status(HttpStatus.UNAUTHORIZED).send('AddressId not found');
        return;
      }

      res.send('Address Updated Successfully');
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
    }
  }

  @Post('deleteAddress')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async deleteAddress(
    @Body() deleteAddressBookEntryDto: DeleteAddressBookEntryDto,
    @Res() res,
  ) {
    try {

      const deleted = await this.userAddressBookService.deleteAddressBookEntry(
        deleteAddressBookEntryDto['id'],
        deleteAddressBookEntryDto.addressId,
      );

      if (!deleted) {
        res.status(HttpStatus.UNAUTHORIZED).send('AddressId not found');
        return;
      }

      res.send('Address Deleted Successfully');

    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error in the database');
    }
  }
}
