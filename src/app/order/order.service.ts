/* eslint-disable prettier/prettier */
import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { Order } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./order.Dto";

@Injectable()
export class OrderService{
    constructor(
        private prismaService : PrismaService,
    ){}

    
    async getOrders():Promise<Order[]>{
        return await this.prismaService.order.findMany()
    }

    async getCart(id: string):Promise<Order>{
        return await this.prismaService.order.findUnique({
            where:{
                userId: id
            }
        })
    }

    async createOrder(@Body() order : OrderDto): Promise<Order>{
        const currentOrder = await this.prismaService.order.findUnique({
            where:{
                id: order.id
            }
        })
        let newOrder : any
        if(!currentOrder){
            newOrder = await this.prismaService.order.create({
                data:order
            })
        }else(
            newOrder = await this.updateOrder(order)
        )

        return newOrder 
    }

    async updateOrder(@Body() order: OrderDto): Promise<Order>{
        return await this.prismaService.order.update({
            where:{
                id: order.id,
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