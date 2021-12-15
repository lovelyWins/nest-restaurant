import { RestaurantSchema } from './restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
    dest: "./public"
  }),
  MongooseModule.forFeature([{ name: 'Restaurant', schema: RestaurantSchema }]),],
  controllers: [RestaurantController],
  providers: [RestaurantService,],
  exports: [RestaurantService,]
})

export class RestaurantModule { }
