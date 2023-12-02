/* eslint-disable prettier/prettier */
import { Injectable, Body } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import {CreateProductDto} from "./createProduct.dto"
import { UpdateProductDto } from "./updateProduct.dto";
import { Product } from "@prisma/client";

@Injectable()
export class ProductService{
  constructor(private prismaService: PrismaService) {}

  async getproduct(): Promise<Product[]> {
        return  await this.prismaService.product.findMany({
            skip:0,
            take:6,
            include:{
                images:true
            }
        });

    }

    async getproductByCategory(id: string):Promise<Product[]>{
        return  await this.prismaService.product.findMany({
            where:{
                categoryId:id
            },
            skip:0,
            take:6,
            include:{
                images:true
            }
        });

    }

    async createproduct(@Body() product : CreateProductDto):Promise<Product> {
        return await this.prismaService.product.create({
            data: {
                ...product,
            },
        });
    }

    async updateproduct(id: string, @Body() product: UpdateProductDto): Promise<Product>{
        return await this.prismaService.product.update({
            where: {
                id: id,
            },
            data: {
                ...product,
            },
        });
    }

    async deleteproduct(id: string){
        return await this.prismaService.product.delete({
            where: {
                id: id
            }
        });
    }
}