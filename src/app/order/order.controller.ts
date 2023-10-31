import { Controller, Get, Post, Body, Put, Delete, Query, Param } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "./order.Dto";
import { Order } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";

@Controller('order')
@ApiTags('Order')
export class OrderController{
    constructor(
        private orderService : OrderService
    ){}
    
    @Get()
    async getAll():Promise<Order[]>{
        return await this.orderService.getOrders();
    }

    @Get('order/:id')
    async getOrderById(@Param('id') id:string):Promise<Order>{
        return await this.orderService.getOrderById(id);
    }
    @Post()
    async create(@Body() order: OrderDto): Promise<Order>{
        return await this.orderService.createOrder(order);
    }


    @Put(':id')
    async updatePet(@Query('id') id: string,@Body() order: OrderDto): Promise<Order>{
        return await this.orderService.updateOrder(id, order);
    }

}