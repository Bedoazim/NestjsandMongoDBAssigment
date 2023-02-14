import { IsNotEmpty, IsString } from "class-validator";


export class DeleteAddressBookEntryDto  {

    @IsNotEmpty({message : "You should send AddressId"})
    @IsString({message : "You should send a valid format"})
    addressId:string
}