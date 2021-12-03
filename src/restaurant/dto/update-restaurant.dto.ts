import { PartialType } from '@nestjs/mapped-types';
import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { AddressDto } from './address.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {

    @IsString()
    public name: string;

    @IsString()
    @IsOptional()
    public image: string;

    @IsString()
    public email: string;

    @IsString()
    public timing: string[];

    @ValidateNested()
    public address: AddressDto;
}
