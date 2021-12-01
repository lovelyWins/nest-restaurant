import {IsString, IsOptional, ValidateNested, } from 'class-validator'
import { AddressDto } from './address.dto';

export class CreateRestaurantDto {
    @IsString()
    public name: string;
  
    @IsString()
    @IsOptional()
    public image: string;
  
    @IsString()
    public email: string;
  
    @IsString()
    public password: string;
  
    @IsString()
    public timing: string[];
  
    @ValidateNested()
    public address: AddressDto;
}
