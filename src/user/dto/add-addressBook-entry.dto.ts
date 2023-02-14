import { IsNotEmpty ,Length, IsString, Matches, IsNumber } from "class-validator";
import { AddressBookEntry } from "../entities/addressBookEntry.entity";


export class AddAddressBookEntryDto extends AddressBookEntry {

    @IsNotEmpty({message : "You should send name"})
    @IsString({message : "You should send a valid format"})
    @Length(3,255,{message: "name can't be less than 2-letters"})
    @Matches('^[a-zA-Z\\s]+$')
    name:string;

    @IsNotEmpty({message : "You should send phone number"})
    @IsString({message : "You should send a valid format"})
    @Matches('^01[0125][0-9]{8}$')
    phoneNumber:string;


    @IsNotEmpty({message : "You should send city name"})
    @IsString({message : "You should send a valid format"})
    city: string;

    @IsNotEmpty({message : "You should send city name"})
    @IsString({message : "You should send a valid format"})
    streetName: string;

    @IsNotEmpty({message : "You should send building number"})
    @IsNumber()
    building: number;

    @IsNotEmpty({message : "You should send floor number"})
    @IsNumber()
    floor: number;

    @IsNotEmpty({message : "You should send apartment number"})
    @IsNumber()
    apartment: number;

}