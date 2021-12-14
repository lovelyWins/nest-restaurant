import { UpdateCustomerDto } from './dto/updateCustoer.dto';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { CustomerService } from './customer.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    // create customer
    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.addCustomer(createCustomerDto)
    }

    // get all customers
    @Get()
    async getAll() {
        return this.customerService.listAllCustoemer()
    }

    // get customer by id
    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.customerService.getCustoemrById(id)
    }

    @Patch(':id')
    async updateCustomer(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto
    ) {
        return this.customerService.updateCustomer(id, updateCustomerDto)
    }

    @Delete(':id')
    async deleteCustomer(
        @Param('id') id: string
    ) {
        return this.customerService.deleteCustomer(id)
    }


}

















