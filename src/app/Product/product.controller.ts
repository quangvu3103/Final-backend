/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param, Patch } from "@nestjs/common";
import { ProductService } from "./product.sevice"
import { CreateProductDto } from "./createProduct.dto";
import { Product } from "@prisma/client";
import { UpdateProductDto } from "./updateProduct.dto";
import { ApiTags } from "@nestjs/swagger";
import { CheckOutDTO } from "../order/checkOut.dto";

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
    @Get('search')
    async searchProduct(
        @Query('name') name: string,
        @Query('minPrice') minPrice: string,
        @Query('maxPrice') maxPrice: string
     ):Promise<Product[]>{
        return await this.productService.searchProduct(name, minPrice, maxPrice)
    }
    @Get('category/:id')
    async getByCategory(@Param('id') id:string):Promise<Product[]>{
        return await this.productService.getproductByCategory(id);
    }
    @Post()
    async create(@Body() product: CreateProductDto): Promise<Product>{
        return await this.productService.createproduct(product);
    }

    @Get(':id')
    async getProductById(@Param('id') id:string) :Promise<Product>{
        return await this.productService.getproductById(id);
    }


    @Put(':id')
    async updateProduct(@Param('id') id: string,@Body() product: UpdateProductDto): Promise<Product>{
        return await this.productService.updateproduct(id, product);
    }


    @Patch(':id')
    async deletePet(@Param('id') id: string){
        return await this.productService.deleteproduct(id);
    }

    
}