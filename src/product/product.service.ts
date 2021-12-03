import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose'
import { Product } from "./interface/product.interface"
@Injectable()
export class ProductService {

  // conifiguring product modal
  constructor(@InjectModel('Product') private productModel: Model<Product>) { }


  async create(createProductDto: CreateProductDto) {
    const newProduct = await new this.productModel({
      name: createProductDto.name,
      image: createProductDto.image,
      price: createProductDto.price,
      category: createProductDto.category,
      restaurant: createProductDto.restaurant
    })
    await newProduct.save()
    return { message: "Product added" }

  }

  async findAll() {
    const products = await this.productModel.find({})
    return { products }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById({ _id: id })
    return { product }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate({ _id: id }, updateProductDto, { new: true, upsert: true })

    await updatedProduct.save()
    return { message: "Product updated " }
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete({ _id: id })
    return { message: "Product deleted" }
  }
}
