import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super() // if your strategy requires other configuration it'll be done in super
    }

    async validate(email: string, password: string) {
        const restaurant = await this.authService.validateRestaurant(email, password)
        if (!restaurant) {
            throw new UnauthorizedException()
        }

        return restaurant
    }

}