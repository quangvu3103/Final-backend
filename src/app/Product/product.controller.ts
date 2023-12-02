/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param } from "@nestjs/common";
import { ProductService } from "./product.sevice"
import { CreateProductDto } from "./createProduct.dto";
import { Product } from "@prisma/client";
import { UpdateProductDto } from "./updateProduct.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('product')
@ApiTags('Product')
export class ProductController{
    constructor(
        private productService : ProductService
    ){}
    
    @Get()
    async getAll():Promise<Product[]>{
        return await this.productService.getproduct();
    }

    @Get('category/:id')
    async getByCategory(@Param('id') id:string):Promise<Product[]>{
        return await this.productService.getproductByCategory(id);
    }
    @Post()
    async create(@Body() product: CreateProductDto): Promise<Product>{
        return await this.productService.createproduct(product);
    }


    @Put(':id')
    async updateProduct(@Query('id') id: string,@Body() product: UpdateProductDto): Promise<Product>{
        return await this.productService.updateproduct(id, product);
    }

    @Delete(':id')
    async deletePet(@Query('id') id: string){
        return await this.productService.deleteproduct(id);
    }
}