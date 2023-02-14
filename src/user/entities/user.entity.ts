import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AddressBookEntry, AddressBookSchema } from "./addressBookEntry.entity";

export type UserDocument = User & Document;

@Schema()
export class User {


    @Prop({ 
        required: true,
        type : ()=> String,  
        minlength : 3, 
        match : /^[a-zA-Z\\s]+$/ 
    })
    name: string;

    @Prop({ 
        required: true, 
        unique : true, 
        type : ()=> String,
        match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    })
    email: string;

    @Prop({ 
        required: true, 
        unique : true, 
        match : /^01[0125][0-9]{8}$/
    })
    phoneNumber: string;

    @Prop({ 
        required: true, 
        type : ()=> String,
        minlength : 8 
    })
    password: string;

    @Prop({ type : [AddressBookSchema] , required : true, ref : 'AddressBookEntry' })
    addressBook: AddressBookEntry[];
}

export const UserSchema = SchemaFactory.createForClass(User);