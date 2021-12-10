import { LoginDto } from './dto/login.dto';
import { CreateRestaurantDto } from './../restaurant/dto/create-restaurant.dto';
import { editFileName, imageFilter } from './../utils/imgUpload.helper';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { Controller, Post, UseInterceptors, Body, UploadedFile, Request, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {


    constructor(
        private authService: AuthService,
    ) { }


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
    async register(
        @Request() req,
        @Body() createRestaurantDto: CreateRestaurantDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return (this.authService.register(req, createRestaurantDto, file))
    }

    //login restaurant
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    // testing auth
    @UseGuards(AuthGuard())
    @Get('test')
    public async testAuth(@Req() req: any) {
      return req.restaurant;
    }

    
}
