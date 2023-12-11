/* eslint-disable prettier/prettier */
import { Injectable, Body } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import {CreateProductDto} from "./createProduct.dto"
import { UpdateProductDto } from "./updateProduct.dto";
import { Product } from "@prisma/client";
import { contains, max } from "class-validator";

@Injectable()
export class ProductService{
  constructor(private prismaService: PrismaService) {}

  async getproduct(): Promise<Product[]> {
        return  await this.prismaService.product.findMany({
            where:{
                isDelete: false
            },
            skip:0,
            take:6,
            include:{
                images:true
            }
        });

    }

    async getproductById(id: string): Promise<Product> {
        return  await this.prismaService.product.findUnique({
            where:{
                id : id,
                isDelete: false
            },
            include:{
                images:true
            }
            
        });

    }

    async getproductByCategory(id: string):Promise<Product[]>{
        return  await this.prismaService.product.findMany({
            where:{
                categoryId:id,
                isDelete: false
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
        const orderDetailsExit = await this.prismaService.orderDetail.findMany({
            where:{
                productId: id,
            },
            include:{
                order: true
            }
        })
        for(let i=0; i< orderDetailsExit.length; i++){
            const order = await this.prismaService.order.findUnique({
                where:{
                    id : orderDetailsExit[i].orderId,
                    status: 'IN_PROGRESS'
                }
            })
            if(order){
                await this.prismaService.orderDetail.delete({
                    where:{
                        id : orderDetailsExit[i].id
                    }
                })
            }
        }
        return await this.prismaService.product.update({
            where: {
                id: id
            },
            data:{
                isDelete: true
            }
        });
    }

    async searchProduct(name: string, minPrice: string, maxPrice: string):Promise<Product[]>{

        return await this.prismaService.product.findMany({
            where:{
                name:{contains: name},
                price:{
                    gte: parseInt(minPrice),
                    lte: parseInt(maxPrice)
                }
            }
        })
    }

    
}