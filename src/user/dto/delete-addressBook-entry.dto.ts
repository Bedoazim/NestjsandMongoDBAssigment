import { IsNotEmpty, IsString } from "class-validator";


export class DeleteAddressBookEntryDto  {

    @IsNotEmpty()
    @IsString()
    addressId:string
}