import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AddressBookEntry } from './entities/addressBookEntry.entity';
import { UpdateAddressBookEntryDto } from './dto/update-addressBook-entry.dto';
import { AddAddressBookEntryDto } from './dto/add-addressBook-entry.dto';

@Injectable()
export class UserAddressBookService {

  constructor(private readonly userRepository: UserRepository) {}

  async getAddressBook(id: string): Promise<AddressBookEntry[]> {
    const user = await this.userRepository.findOne({
      _id: id,
    });

    return user.addressBook;
  }

  async addAddressBookEntry(
    addAddressBookEntryDto: AddAddressBookEntryDto,
    id: string,
  ) : Promise<Boolean> {
    const user = await this.userRepository.findOne({
      _id: id,
    });

    if(user == null){
      return false;
    }

    const addressBook: AddressBookEntry[] = user.addressBook;

    addressBook.push(addAddressBookEntryDto);

    await this.userRepository.findOneAndUpdate(
      {
        _id: id,
      },
      { addressBook: addressBook },
    );

    return true;
  }

  async updateAddressBookEntry(
    updateAddressBookEntryDto: UpdateAddressBookEntryDto,
    id: string,
    addressId: string,
  )  : Promise<Boolean> {
    const user = await this.userRepository.findOne({
      _id: id,
      addressBook : {$elemMatch: { _id : addressId}}
    });

    if(user == null){
      return false;
    }

    const updatedAddressBook: AddressBookEntry[] = user.addressBook;

    updatedAddressBook.forEach((address: AddressBookEntry) => {
      if (address['_id'].valueOf() === addressId) {
        address.name =
          updateAddressBookEntryDto.name != null
            ? updateAddressBookEntryDto.name
            : address.name;
        address.phoneNumber =
          updateAddressBookEntryDto.phoneNumber != null
            ? updateAddressBookEntryDto.phoneNumber
            : address.phoneNumber;
        address.city =
          updateAddressBookEntryDto.city != null
            ? updateAddressBookEntryDto.city
            : address.city;
        address.streetName =
          updateAddressBookEntryDto.streetName != null
            ? updateAddressBookEntryDto.streetName
            : address.streetName;
        address.building =
          updateAddressBookEntryDto.building != null
            ? updateAddressBookEntryDto.building
            : address.building;
        address.floor =
          updateAddressBookEntryDto.floor != null
            ? updateAddressBookEntryDto.floor
            : address.floor;
        address.apartment =
          updateAddressBookEntryDto.apartment != null
            ? updateAddressBookEntryDto.apartment
            : address.apartment;
      }
    });

    await this.userRepository.findOneAndUpdate(
      {
        _id: id,
      },
      { addressBook: updatedAddressBook },
    );

    return true;

  }

  async deleteAddressBookEntry(id: string, addressId: string) : Promise<Boolean> {
    
    const user = await this.userRepository.findOne({
      _id: id,
      addressBook : {$elemMatch: { _id : addressId}}
    });

    if(user == null){
      return false;
    }

    await this.userRepository.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          addressBook :  { _id : addressId}
        }
      },
    );

    return true;
  }
}
