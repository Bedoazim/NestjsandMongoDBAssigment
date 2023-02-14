import { IsNotEmpty ,Length, IsEmail, IsString, Matches } from "class-validator";
import { User } from "../entities/user.entity";


export class CreateUserDto extends User {

    @IsNotEmpty()
    @IsString()
    @Length(3,255)
    @Matches('^[a-zA-Z\\s]+$')
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    @Matches('^01[0125][0-9]{8}$')
    phoneNumber:string;

    @IsNotEmpty()
    @IsString()
    @Length(8,255)
    password:string;

}
