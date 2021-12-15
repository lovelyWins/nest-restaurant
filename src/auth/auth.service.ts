import { PayloadDto } from './dto/payload.dto';
import { CustomerService } from './../customer/customer.service';
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
        private customerService: CustomerService

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

    // creating jwt token
    async createToken(id: string) {
        const expiresIn = process.env.EXPIRESIN
        const payload = { id }
        const token = this.jwtService.sign(payload)
        return { token, expiresIn }
    }

    // restaurant login
    async login(loginDto: LoginDto) {
        const restaruant = await this.restaurantService.findRestaurantByLogin(loginDto)
        return this.createToken(restaruant.id)
    }

    // customer login
    async customerLogin(loginDto: LoginDto) {
        const customer = await this.customerService.findCustomerByLogin(loginDto)
        return this.createToken(customer.id)
    }

    // customer validation
    async validateCustomer(payload: PayloadDto) {
        const customer = await this.customerService.findCustomerByPayload(payload)
        if (!customer) {
            throw new UnauthorizedException()
        }
        return customer
    }

    // validate restaurant
    async vaidateRestauant(payload: PayloadDto) {


        const restaurant = await this.restaurantService.findRestaurantByPayload(payload)
        const customer = await this.customerService.findCustomerByPayload(payload)


        if (!restaurant && !customer) {
            throw new UnauthorizedException()
        }

        if (restaurant) {
            return restaurant
        }
        else if (customer) {
            return customer
        }

    }



}
