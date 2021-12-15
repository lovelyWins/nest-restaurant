import { IsArray, IsString } from "class-validator";

export class PayloadDto {
    @IsString()
    public id: string;

}