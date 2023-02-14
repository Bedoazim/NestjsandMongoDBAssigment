import { IsNotEmpty ,Length, IsString, Matches, IsNumber } from "class-validator";
import { AddressBookEntry } from "../entities/addressBookEntry.entity";


export class AddAddressBookEntryDto extends AddressBookEntry {

    @IsNotEmpty()
    @IsString()
    @Length(3,255)
    @Matches('^[a-zA-Z\\s]+$')
    name:string;

    @IsNotEmpty()
    @IsString()
    @Matches('^01[0125][0-9]{8}$')
    phoneNumber:string;


    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    streetName: string;

    @IsNotEmpty()
    @IsNumber()
    building: number;

    @IsNotEmpty()
    @IsNumber()
    floor: number;

    @IsNotEmpty()
    @IsNumber()
    apartment: number;

}