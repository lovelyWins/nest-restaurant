import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [RestaurantModule,DatabaseModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
