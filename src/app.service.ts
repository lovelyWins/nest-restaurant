import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
@Injectable()
export class AppService {

  logger:Logger

  constructor(){
    this.logger = new Logger()
  }

  getHello(): string {
    this.logger.log('logger is running')
    return 'Hello World!';
  }
}
