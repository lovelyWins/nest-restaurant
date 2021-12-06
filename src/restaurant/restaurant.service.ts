import { RestaurantWithThatEmailAlreadyExistsException } from './../httpExceptions/RestaurantWithThatEmailAlreadyExistsException';
import { Injectable, Request } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Model } from 'mongoose';
import { Restaurant } from './interfaces/restaurant.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { createImagePath, editFileName } from '../utils/imgUpload.helper';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RestaurantService {

  logger: Logger

  //configuring restaurant model
  constructor(@InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,) {
    this.logger = new Logger();
    this.restaurantModel = restaurantModel;
  }


  // registering restaurant
  async create(req, createRestaurantDto: CreateRestaurantDto, image: Express.Multer.File) {
    try {

        const imgPath = createImagePath(req, image,'restaurant');
      const newRestaurant = await new this.restaurantModel({
        name: createRestaurantDto.name,
        email: createRestaurantDto.email,
        password: createRestaurantDto.password,
        image: imgPath,
        timing: createRestaurantDto.timing,
        address: createRestaurantDto.address
      })

      const existingEmail = await this.restaurantModel.findOne({ email: createRestaurantDto.email })
      if (existingEmail) {
        throw new RestaurantWithThatEmailAlreadyExistsException(createRestaurantDto.email)
      }

      await newRestaurant.save()
      return { message: "Restaurant registered" }
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


  // once auth is working id will be extracted from token instead of param
  async update(req, id: string, updateRestaurantDto: UpdateRestaurantDto, newImg: Express.Multer.File) {

  
    try {
      if (newImg && newImg.path) {
        updateRestaurantDto.image = createImagePath(req, newImg, 'restaurant')
      } else {
        delete updateRestaurantDto.image
      }

      const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate({ _id: id }, updateRestaurantDto, { new: true, upsert: true }).select("-password -__v -address._id")

      if (newImg) {
        fs.unlinkSync(path.join(__dirname, "../../public/uploads/restaurant", path.basename(updateRestaurantDto.image)))
      }

      return {
        message: "Restaurant updated",
        updatedRestaurant: updatedRestaurant
      }
    }
    catch (error) {
      throw { message: error.message }
    }

  }

  async remove(id: string) {
    try {
      await this.restaurantModel.findByIdAndDelete({ _id: id })
      return { message: "Restaurant deleted" }
    } catch (error) {
      throw { message: error.message }
    }
  }
}
