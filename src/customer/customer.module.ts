import { CustomerSchema } from './schema/custoemer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Customer", schema: CustomerSchema }])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports :[CustomerService]
})
export class CustomerModule { }
