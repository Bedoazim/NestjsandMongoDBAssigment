import { IsNotEmpty ,Length, IsEmail, IsString, Matches } from "class-validator";
import { User } from "../entities/user.entity";


export class CreateUserDto extends User {

    @IsNotEmpty({message : "You should send name"})
    @IsString({message : "You should send a valid format"})
    @Length(3,255,{message: "name can't be less than 2-letters"})
    @Matches('^[a-zA-Z\\s]+$')
    name:string;

    @IsNotEmpty({message : "You should send email"})
    @IsString({message : "You should send a valid format"})
    @IsEmail()
    email:string;

    @IsNotEmpty({message : "You should send phone number"})
    @IsString({message : "You should send a valid format"})
    @Matches('^01[0125][0-9]{8}$')
    phoneNumber:string;

    @IsNotEmpty({message : "You should send password"})
    @IsString({message : "You should send a valid format"})
    @Length(8,255,{message: "Password can't be less than 8-characters"})
    password:string;

}
