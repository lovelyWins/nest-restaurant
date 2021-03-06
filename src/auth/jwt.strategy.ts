import { PayloadDto } from './dto/payload.dto';
import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Inject, UnauthorizedException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Logger } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    logger: Logger
    constructor(
        private readonly authservice: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        })
        logger: new Logger()
    }

    // restaurant token validation
    async validate(payload: PayloadDto) {

        // const restaurant = await this.authservice.vaidateRestauant(payload)
        // const customer = await this.authservice.validateCustomer(payload)
        // if (!restaurant && !customer) {
        //     throw new UnauthorizedException()
        // }

        // if (restaurant) {
        //     return restaurant
        // }
        // else if (customer) {
        //     return customer
        // }

        const user = await this.authservice.vaidateRestauant(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
        
    }




}