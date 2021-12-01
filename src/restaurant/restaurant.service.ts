import { RestaurantWithThatEmailAlreadyExistsException } from './../httpExceptions/RestaurantWithThatEmailAlreadyExistsException';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Model } from 'mongoose';
import { Restaurant } from './interfaces/restaurant.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RestaurantService {

  //configuring restaurant model
  constructor(@InjectModel('Restaurant') private restaurantModel: Model<Restaurant>) { }

  // registering restaurant
  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const newRestaurant = await new this.restaurantModel({
        name: createRestaurantDto.name,
        email: createRestaurantDto.email,
        password: createRestaurantDto.password,
        timing: createRestaurantDto.timing,
        address: createRestaurantDto.address
      })

      const existingEmail = await this.restaurantModel.findOne({ email: createRestaurantDto.email })
      if (existingEmail) {
        throw new RestaurantWithThatEmailAlreadyExistsException(createRestaurantDto.email)
      }

      await newRestaurant.save()
      return { message: "Restaurant registered", email: existingEmail }
    }
    catch (error) {
      throw { message: error.message }
    }
  }

  async findAll() {

    try {
      const restaurants = await this.restaurantModel.find({})
      return restaurants
    } catch (error) {
      throw { message: error.message }
    }
  }

  async findOne(id: string) {

    try {
      const restaurant = await this.restaurantModel.findById({ _id: id })
      return restaurant
    }
    catch (error) {
      throw { message: error.message }
    }

  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  async remove(id: string) {
    try {
      await this.restaurantModel.findByIdAndDelete({ _id: id })
      return { message: "Restaurant deleted"}
    } catch (error) {
      throw { message: error.message }
    }
  }
}
