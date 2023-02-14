import { IsNotEmpty ,Length, IsString } from "class-validator";
import { IsEqualTo } from "src/isequalto.decorator";


export class ChangeUserPasswordDto {

    @IsNotEmpty({message : "You should send old password"})
    oldPassword:string;

    @IsNotEmpty({message : "You should send new password"})
    @IsString({message : "You should send a valid format"})
    @Length(8,255,{message: "Password can't be less than 8-characters"})
    newPassword:string;

    @IsNotEmpty({message : "You should send new password"})
    @IsString({message : "You should send a valid format"})
    @Length(8,255,{message: "Password can't be less than 8-characters"})
    @IsEqualTo('newPassword',{message: "Passwords don't match"})
    confirmNewPassword:string;

}