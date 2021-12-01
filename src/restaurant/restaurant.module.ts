import { RestaurantSchema } from './restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Restaurant', schema: RestaurantSchema }])
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})

export class RestaurantModule {}
