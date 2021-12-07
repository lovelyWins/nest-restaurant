import { Injectable } from '@nestjs/common';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
    logger: Logger

    constructor(private restaurantService: RestaurantService) {
        this.logger = new Logger()
    }


    async validateRestaurant(email: string, password: string) {
        this.logger.log('validator auth service is running ')
        const restaurant = await this.restaurantService.findOne(email)

        // cheking if restaurant exist in db
        this.logger.log('restaurnt found in database : ', restaurant)
        if (!restaurant) {
            return 'Cannot find restaurant'
        }


        // cheking if user is entering correct password
        if (restaurant.password = password) {
            this.logger.log('Restaurant authenticated successfully')
            return restaurant

        }


        return null
    }







}
