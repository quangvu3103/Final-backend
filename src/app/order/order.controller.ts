/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "./order.Dto";
import { Order } from "@prisma/client";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Role } from "src/common/enums/role.enum";
import { MyJwtGuard } from "src/common/guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth('Jwt-auth')
@Roles(Role.User)
@UseGuards(MyJwtGuard, RolesGuard)
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