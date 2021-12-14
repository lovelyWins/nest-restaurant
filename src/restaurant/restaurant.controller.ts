import { Roles } from './../decorators/roles.decorator';
import { diskStorage } from 'multer';
import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HostParam, UseGuards, SetMetadata } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFilter } from '../utils/imgUpload.helper';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/roles.enum';


@Controller('restaurant')
export class RestaurantController {

  constructor(
    private readonly restaurantService: RestaurantService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: any) {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  // problem:- image is not getting uploaded (in restaurant folder) and existing image is not getting deleted. when change directory path to something else like (restaurant2) in destination then image is getting upload. 
  // using Id as "param" because auth is not done yet. once auth is established "id " will be extracted from jwt
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }



  @Get('test/onlyRestaurant')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.RESTAURANT)
  async testRole() {
    return 'only for restaurant'
  }
  @Get('test/onlyCustomer')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.CUSTOMER)
  async testRole2() {
    return 'only for customer'
  }

}
