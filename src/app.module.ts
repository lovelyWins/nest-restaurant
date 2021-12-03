import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [RestaurantModule,DatabaseModule, ProductModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
