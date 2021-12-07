import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[RestaurantModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
