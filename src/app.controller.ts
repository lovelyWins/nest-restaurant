
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, UseGuards , Request} from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }




  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



}
