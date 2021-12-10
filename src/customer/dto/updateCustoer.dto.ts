import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './createCustomer.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {

    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public phone: string;

}
