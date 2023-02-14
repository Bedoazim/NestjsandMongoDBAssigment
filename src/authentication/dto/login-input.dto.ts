import { IsNotEmpty } from "class-validator";


export class LoginInputDto {

    @IsNotEmpty({message : "You should send email"})
    email:string;


    @IsNotEmpty({message : "You should send password"})
    password:string;

}
