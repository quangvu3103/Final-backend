/* eslint-disable prettier/prettier */
import { Body, Injectable } from "@nestjs/common";
import { Order } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./order.Dto";
import { promises } from "dns";




@Injectable()
export class OrderService{
    constructor(
        private prismaService : PrismaService,
    ){}

    
    async getOrders():Promise<Order[]>{
        return await this.prismaService.order.findMany()
    }

    async createOrder(@Body() order : OrderDto): Promise<Order>{
        return await this.prismaService.order.create({
            data:order
        })
    }

    async updateOrder(id: string, @Body() order: OrderDto): Promise<Order>{
        return await this.prismaService.order.update({
            where:{
                id: id,
            },
            data: {
                ...order,
            },
        });
    }

    async getOrderById(id: string):Promise<Order>{
        return  await this.prismaService.order.findUnique({
            where:{
                id:id
            },
           
            include:{
                orderDetails:true
            }
        });

    }

    
}