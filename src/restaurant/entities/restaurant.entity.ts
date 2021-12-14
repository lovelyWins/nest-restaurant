import { Role } from './../../enums/roles.enum';
import { AddressDto } from './../dto/address.dto';

export class Restaurant {
    name: string;
    roles: Role[];
    image: string;
    email: string;
    password: string;
    timing: [string];
    address: AddressDto;
}
