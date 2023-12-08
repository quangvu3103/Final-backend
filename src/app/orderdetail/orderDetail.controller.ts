/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Put, Delete, Query, Param } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service"
import { OrderDetail } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import { orderDetailsDto } from "./orderDetail.Dto";

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


    @Put(':id')
    async updateOrderDetail(@Query('id') id: string,@Body() orderDetail : orderDetailsDto): Promise<OrderDetail>{
        return await this.orderDetailService.updateOrderDetail(id, orderDetail);
    }

    @Delete(':id')
    async deletePet(@Param('id') id: string){
        return await this.orderDetailService.deleteOrderDetail(id);
    }
}