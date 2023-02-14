import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class AddressBookEntry {


    @Prop({ 
        required: true,
        type : ()=> String,  
        minlength : 3, 
        match : /^[a-zA-Z\\s]+$/ 
    })
    name: string;

    @Prop({ 
        required: true, 
        match : /^01[0125][0-9]{8}$/
    })
    phoneNumber: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    streetName: string;

    @Prop({ required: true })
    building: number;

    @Prop({ required: true })
    floor: number;

    @Prop({ required: true })
    apartment: number;

}

export const AddressBookSchema = SchemaFactory.createForClass(AddressBookEntry);