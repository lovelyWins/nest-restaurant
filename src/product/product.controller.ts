import { editFileName, imageFilter } from './../utils/imgUpload.helper';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: "./public/uploads/product",
        filename: editFileName
      }),
      fileFilter: imageFilter
    }))
  create(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productService.create(req, createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: "./public/uploads/product",
        filename: editFileName
      }),
      fileFilter: imageFilter
    }))
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productService.update(req, id, updateProductDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
