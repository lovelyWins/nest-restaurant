import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose'
import { Product } from "./interface/product.interface"
import { createImagePath } from 'src/utils/imgUpload.helper';;
import * as path from 'path';
import * as fs from 'fs';



@Injectable()
export class ProductService {

  // conifiguring product modal
  constructor(@InjectModel('Product') private productModel: Model<Product>) { }


  async create(req, createProductDto: CreateProductDto, image: Express.Multer.File) {
    try {
      const imgPath = createImagePath(req, image, 'product');
      const newProduct = await new this.productModel({
        name: createProductDto.name,
        image: imgPath,
        price: createProductDto.price,
        category: createProductDto.category,
        restaurant: createProductDto.restaurant
      })
      await newProduct.save()
      return { message: "Product added" }
    }
    catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find({})
      return { products }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById({ _id: id })
      return { product }
    }
    catch (error) { throw error }
  }

  async update(req, id: string, updateProductDto: UpdateProductDto, newImg: Express.Multer.File) {
    try {
      if (newImg && newImg.path) {
        updateProductDto.image = createImagePath(req, newImg, 'restaurant')
      } else {
        delete updateProductDto.image
      }

      const updatedProduct = await this.productModel.findByIdAndUpdate({ _id: id }, updateProductDto, { new: true, upsert: true })
      await updatedProduct.save()

      if (newImg) { fs.unlinkSync(path.join(__dirname, "../../public/uploads/product", path.basename(updateProductDto.image)))}

      return { message: "Product updated " }

    }
    catch (error) {
      return { message: error.message }
    }


  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete({ _id: id })
    return { message: "Product deleted" }
  }
}
