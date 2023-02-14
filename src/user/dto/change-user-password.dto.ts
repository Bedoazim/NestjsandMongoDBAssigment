import { IsNotEmpty ,Length, IsString } from "class-validator";
import { IsEqualTo } from "src/isequalto.decorator";


export class ChangeUserPasswordDto {

    @IsNotEmpty()
    @IsString()
    oldPassword:string;

    @IsNotEmpty()
    @IsString()
    @Length(8,255,)
    newPassword:string;

    @IsNotEmpty()
    @IsString()
    @IsEqualTo('newPassword',{message: "Passwords don't match"})
    confirmNewPassword:string;

}