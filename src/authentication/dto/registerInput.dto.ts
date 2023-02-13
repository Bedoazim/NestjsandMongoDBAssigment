import { IsNotEmpty ,Length, IsEmail, IsPhoneNumber,IsString, Matches } from "class-validator";

export class RegisterInputDto {

    @IsNotEmpty({message : "You should send username"})
    @IsString({message : "You should send a valid format"})
    @Length(3,255,{message: "Username can't be less than 2-letters"})
    @Matches('^[a-zA-Z\\s]+$')
    username:string;

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
    @Length(8,255,{message: "Password can't be less than 8-digits"})
    password:string;
    
}
