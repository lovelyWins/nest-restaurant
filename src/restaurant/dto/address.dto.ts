import { IsString } from "class-validator";

export class AddressDto{
    @IsString()
    public street: string;
    @IsString()
    public city: string;
    @IsString()
    public country: string;
}