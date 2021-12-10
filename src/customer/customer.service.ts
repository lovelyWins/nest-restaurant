import { UpdateCustomerDto } from './dto/updateCustoer.dto';
import { hashPassword } from './../utils/auth.helper';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { Customer } from './interface/customer.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private customerModel: Model<Customer>) { }

    async addCustomer(createCustomerDto: CreateCustomerDto) {
        const hashedPassword = await hashPassword(createCustomerDto.password)
        const customer = await new this.customerModel({
            name: createCustomerDto.name,
            email: createCustomerDto.email,
            password: hashedPassword,
            phone: createCustomerDto.phone
        })
        await customer.save()
        return { messge: "customer added" }
    }


    async listAllCustoemer() {
        const customers = await this.customerModel.find({}).select('-password')
        return { customers }
    }


    async getCustoemrById(id: string) {
        const customer = await this.customerModel.findById({_id:id}).select('-password')
        return { customer }

    }


    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
        const updatedCustomer = await this.customerModel.findByIdAndUpdate({ _id: id }, updateCustomerDto, { new: true, upsert: true })
        await updatedCustomer.save()
        return {message: 'customer updated'}
    }


    async deleteCustomer() { }


}
