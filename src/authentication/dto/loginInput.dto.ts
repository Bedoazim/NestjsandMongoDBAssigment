import { IsNotEmpty, Length, IsString, Matches } from "class-validator";


export class LoginInputDto {

    @IsNotEmpty({message : "You should send username"})
    @IsString({message : "You should send a valid format"})
    @Length(3,255,{message: "Username can't be less than 2-letters"})
    @Matches('^[a-zA-Z\\s]+$')
    username:string;


    @IsNotEmpty({message : "You should send password"})
    @IsString({message : "You should send a valid format"})
    @Length(8,255,{message: "Password can't be less than 8-digits"})
    password:string;

}
