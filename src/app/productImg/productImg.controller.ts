/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param } from "@nestjs/common";
import { Product } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import { ImageDto } from "./dto/image.dto";
import { ProductImgService } from "./productImg.service";

@Controller('productImg')
@ApiTags('ProductImg')
export class ProductImgController{
    constructor(
        private productImgService: ProductImgService
    ){}
    
    @Post()
    async addImageToProduct(@Body() imageDTO : ImageDto){
        return await this.productImgService.addImageToProduct(imageDTO)
    }
}