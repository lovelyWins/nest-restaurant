import { IsString, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsString()
    public name: string;

    @IsString()
    @IsOptional()
    public image: string;

    @IsString()
    public price: string;

    @IsString()
    public category: string[];

    @IsString()
    public restaurant: string;
}
