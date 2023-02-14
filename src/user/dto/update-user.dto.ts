import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { AddressBookEntry } from '../entities/addressBookEntry.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    password:string;

    addressBook:AddressBookEntry[];
}
