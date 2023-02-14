import { AddAddressBookEntryDto } from "./add-addressBook-entry.dto";
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from "class-validator";


export class UpdateAddressBookEntryDto extends PartialType(AddAddressBookEntryDto) {
    
    @IsNotEmpty({message : "You should send AddressId"})
    @IsString({message : "You should send a valid format"})
    addressId:string
}