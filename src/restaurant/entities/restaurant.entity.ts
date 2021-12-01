import { AddressDto } from './../dto/address.dto';

export class Restaurant {
    name: string;
    image: string;
    email: string;
    password: string;
    timing: [string]
    address: AddressDto
}
