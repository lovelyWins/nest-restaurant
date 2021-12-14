import { CustomerModule } from './../customer/customer.module';
import { CustomerService } from './../customer/customer.service';
import { JwtStrategy } from './jwt.strategy';
import { RestaurantService } from './../restaurant/restaurant.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({

  imports: [
    RestaurantModule,
    CustomerModule,
    ConfigModule.forRoot(),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN
      },
    }),
  ],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule]
})
export class AuthModule { }
