import { Role } from './../enums/roles.enum';
import { PayloadDto } from './../auth/dto/payload.dto';
import { CustomerWithGivenEmailDoesNotExist } from './../httpExceptions/CustomerWithGivenEmailDoesNotExist';
import { LoginDto } from './../auth/dto/login.dto';
import { UpdateCustomerDto } from './dto/updateCustoer.dto';
import { hashPassword, comparePassword } from './../utils/auth.helper';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { Customer } from './interface/customer.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantWithGivenEmailDoesNotExist } from 'src/httpExceptions/RestaurantWithGivenEmailDoesNotExist';

@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private customerModel: Model<Customer>) { }

    // adding customer
    async addCustomer(createCustomerDto: CreateCustomerDto) {
        try {
         
            const hashedPassword = await hashPassword(createCustomerDto.password)
            const customer = await new this.customerModel({
                name: createCustomerDto.name,
                roles: Role.CUSTOMER,
                email: createCustomerDto.email,
                password: hashedPassword,
                phone: createCustomerDto.phone
            })
            await customer.save()
            return { messge: "customer added" }
        }

        catch (error) {
            return error
        }

    }

    // getting all customers
    async listAllCustoemer() {

        try {
            const customers = await this.customerModel.find({}).select('-password')
            return { customers }
        }
        catch (error) {
            throw error
        }

    }

    // getting customer by id
    async getCustoemrById(id: string) {

        try {
            const customer = await this.customerModel.findById({ _id: id }).select('-password')
            return { customer }
        }
        catch (error) {
            throw error
        }

    }

    // update customer 
    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {

        try {
            const updatedCustomer = await this.customerModel.findByIdAndUpdate({ _id: id }, updateCustomerDto, { new: true, upsert: true })
            await updatedCustomer.save()
            return { message: 'customer updated' }
        }
        catch (error) {
            throw error
        }

    }

    // delete customer
    async deleteCustomer(id: string) {

        try {
            await this.customerModel.findByIdAndDelete(id)
            return { mesage: "customer deleted" }
        }
        catch (error) {
            throw error
        }

    }


    // login function
    async findCustomerByLogin(loginDto: LoginDto) {

        try {
            // finding restaurant with email
            const customer = await this.customerModel.findOne({ email: loginDto.email })
            if (!customer) {
                throw new CustomerWithGivenEmailDoesNotExist()
            }

            // checking password
            const checked = await comparePassword(loginDto.password, customer.password)
            if (!checked) {
                throw new UnauthorizedException()
            }

            return customer
        }
        catch (error) {
            throw error
        }
    }

    // verifyin token 
    async findCustomerByPayload(payload: PayloadDto) {
        const id = payload.id
        const customer = await this.customerModel.findById({ _id: id})
        return customer
    }





}
