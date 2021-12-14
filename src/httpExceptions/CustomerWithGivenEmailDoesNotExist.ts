

import{HttpException}  from './HttpException';

export class CustomerWithGivenEmailDoesNotExist extends HttpException {
  constructor() {
    super(400, `Customer with given email does not exist`);
  }
}