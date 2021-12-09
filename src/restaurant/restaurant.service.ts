import { JwtService } from '@nestjs/jwt';
import { comparePassword, } from './../utils/auth.helper';
import { LoginDto } from './../auth/dto/login.dto';
import { RestaurantWithThatEmailAlreadyExistsException } from './../httpExceptions/RestaurantWithThatEmailAlreadyExistsException';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { hashPassword } from 'src/utils/auth.helper';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Model } from 'mongoose';
import { Restaurant } from './interfaces/restaurant.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { createImagePath, editFileName } from '../utils/imgUpload.helper';
import * as path from 'path';
import * as fs from 'fs';
import { RestaurantWithGivenEmailDoesNotExist } from 'src/httpExceptions/RestaurantWithGivenEmailDoesNotExist';
import { check } from 'prettier';
import { isEmail } from 'class-validator';

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

      const imgPath = createImagePath(req, image, 'restaurant');
      const hashedPass = await hashPassword(createRestaurantDto.password)

      const newRestaurant = await new this.restaurantModel({
        name: createRestaurantDto.name,
        email: createRestaurantDto.email,
        password: hashedPass,
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

  // getting all restaurant
  async findAll() {

    try {
      const restaurants = await this.restaurantModel.find({}).select("-password")
      return restaurants
    } catch (error) {
      throw { message: error.message }
    }
  }

  // getting one restaurant by id
  async findOne(id: string) {

    try {
      const restaurant = await this.restaurantModel.findById({ _id: id }).select("-password")
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

  // deleting restaurant by id
  async remove(id: string) {
    try {
      await this.restaurantModel.findByIdAndDelete({ _id: id })
      return { message: "Restaurant deleted" }
    } catch (error) {
      throw { message: error.message }
    }
  }

  // finding restaurant by email
  async findRestaurantByEmail(email) {
    const restaurant = await this.restaurantModel.findOne({ email })
    return restaurant
  }

  //loggin
  async findRestaurantByLogin(loginDto: LoginDto) {

    const restaurant = await this.restaurantModel.findOne({ email: loginDto.email })
    if (!restaurant) {
      throw new RestaurantWithGivenEmailDoesNotExist()
    }

    const checked = await comparePassword(loginDto.password, restaurant.password)
    if (!checked) {
      throw new UnauthorizedException()
    }
    return restaurant
  }

  // function for validation
  async findRestaurantByPayload(payload) {
      const restaurant = await this.restaurantModel.findOne({ where: { payload } })
    return restaurant
  }



}

























