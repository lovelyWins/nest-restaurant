import { diskStorage } from 'multer';
import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HostParam } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFilter } from '../utils/imgUpload.helper';


@Controller('restaurant')
export class RestaurantController {

  constructor(private readonly restaurantService: RestaurantService) { }

  // adding restaurant
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: "./public/uploads/restaurant",
        filename: editFileName
      }),
      fileFilter: imageFilter
    }))
  async create(
    @Request() req,
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return (this.restaurantService.create(req, createRestaurantDto, file))
  }


  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }



  // problem:- image is not getting uploaded (in restaurant folder) and existing image is not getting deleted. when change directory path to something else like (restaurant2) in destination then image is getting upload. 
  // using Id as "param" because auth is not done yet. once auth is established "id " will be extracted from jwt
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: "./public/uploads/restaurant",
        filename: editFileName
      }),
      fileFilter: imageFilter
    }))
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.restaurantService.update(req, id, updateRestaurantDto, file);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }

}
