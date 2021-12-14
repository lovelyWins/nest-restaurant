import { RoleGuard } from './auth/guards/role.guard'; 
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    ConfigModule.forRoot(),
    RestaurantModule,
    DatabaseModule,
    ProductModule,
    AuthModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }],
})
export class AppModule { }
