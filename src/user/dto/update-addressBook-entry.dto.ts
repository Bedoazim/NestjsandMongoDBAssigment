import { AddAddressBookEntryDto } from "./add-addressBook-entry.dto";
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from "class-validator";


export class UpdateAddressBookEntryDto extends PartialType(AddAddressBookEntryDto) {
    
    @IsNotEmpty()
    @IsString()
    addressId:string
}