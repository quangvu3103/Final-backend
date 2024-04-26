/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Put, Delete, Query, Param } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service"
import { Order, OrderDetail } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import { orderDetailsDto } from "./orderDetail.Dto";
import { updateOrderDetailsDto } from "./updateOrderDetails.Dto";

@Controller('OrderDetail')
@ApiTags('OrderDetail')
export class OrderDetailController{
    constructor(
        private orderDetailService : OrderDetailService
    ){}
    
    
    @Post()
    async create(@Body() orderDetail: orderDetailsDto): Promise<OrderDetail>{
        return await this.orderDetailService.createOrderDetails(orderDetail)
    }


    @Put()
    async updateOrderDetail(@Query('id') id: string,@Body() orderDetail : updateOrderDetailsDto): Promise<Order>{
        return await this.orderDetailService.updateOrderDetail(id, orderDetail);
    }

    @Delete(':id')
    async deleteOrderDetail(@Param('id') id: string): Promise<Order>{
        return await this.orderDetailService.deleteOrderDetail(id);
    }
}