

import{HttpException}  from './HttpException';

export class RestaurantWithGivenEmailDoesNotExist extends HttpException {
  constructor() {
    super(400, `Restauratn with given email does not exist`);
  }
}