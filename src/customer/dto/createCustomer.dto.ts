import { IsString, IsOptional } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    public name: string;

    @IsString()
    public roles: string[];


    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public phone: string;
}
