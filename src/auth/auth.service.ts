import { HttpException } from './../httpExceptions/HttpException';

import { LoginDto } from './dto/login.dto';
import { CreateRestaurantDto } from './../restaurant/dto/create-restaurant.dto';
import { RestaurantService } from './../restaurant/restaurant.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {

    logger: Logger;
    constructor(
        private restaurantService: RestaurantService,
        private jwtService: JwtService,

    ) {
        this.logger = new Logger()
    }


    async register(req, createRestaurantDto: CreateRestaurantDto, file: Express.Multer.File) {

        try {
            return await this.restaurantService.create(req, createRestaurantDto, file)
        }
        catch (error) {
            throw { message: error.message }
        }

    }

    // login method
    async login(loginDto: LoginDto) {
        const restaruant = await this.restaurantService.findRestaurantByLogin(loginDto)
        return this.createToken(restaruant.id)
    }

    // creating jwt token
    async createToken(id: string) {
        const expiresIn = process.env.EXPIRESIN
        const token = this.jwtService.sign({ id })
        return { token, expiresIn }
    }

    // validate restaurant
    async vaidateRestauant(payload) {
        const restaurant = await this.restaurantService.findRestaurantByPayload(payload)
        if (!restaurant) {
            throw new UnauthorizedException()
        }
        return restaurant
    }


}
