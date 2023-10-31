import { OrderDetail } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { orderDetailsDto } from "./orderDetail.Dto";
import { Body, Injectable } from "@nestjs/common";




@Injectable()
export class OrderDetailService{
    constructor(
        private prismaService : PrismaService,
    ){}

    async createOrderDetails(@Body() orderDetail: orderDetailsDto ):Promise<OrderDetail>{
        return await this.prismaService.orderDetail.create({
            data:{
                ...orderDetail
            }
        })
    }

    async updateOrderDetail(id: string, @Body() orderDetail : orderDetailsDto): Promise<OrderDetail>{
        return await this.prismaService.orderDetail.update({
            where:{
                id: id,
            },
            data: {
                ...orderDetail,
            },
        });
    }

    async deleteOrderDetail(id: string){
        return await this.prismaService.orderDetail.delete({
            where: {
                id: id
            }
        });
    }
}