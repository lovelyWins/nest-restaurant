import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    public name: string;

    @IsString()
    @IsOptional()
    public image: string;

    @IsString()
    public price: string;

    @IsString()
    public category: string[];

}
