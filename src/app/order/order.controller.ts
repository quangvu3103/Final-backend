/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param, UseGuards, Patch } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "./order.Dto";
import { Order, OrderDetail } from "@prisma/client";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Role } from "src/common/enums/role.enum";
import { MyJwtGuard } from "src/common/guard";
import { RolesGuard } from "src/common/guard/roles.guard";
import { GetUser } from "src/common/decorator";
import { ConfirmDTO } from "./confirm.dto";
import { CheckOutDTO } from "./checkOut.dto";

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth('Jwt-auth')
// @Roles(Role.User)
@UseGuards(MyJwtGuard, RolesGuard)
export class OrderController{
    constructor(
        private orderService : OrderService
    ){}
    

    @Roles(Role.Admin)
    @Get()
    async getAll():Promise<Order[]>{
        return await this.orderService.getOrders();
    }

    @Get('by-user')
    async getAllByUser(@GetUser('sub') id: string):Promise<Order[]>{
        return await this.orderService.getOrdersByUser(id);
    }

    @Get('get-card')
    async getCard(@GetUser('sub') userId: string):Promise<Order>{
        return await this.orderService.getCart(userId)
    }

    @Roles(Role.Admin, Role.User)
    @Get('order/:id')
    async getOrderById(@Param('id') id:string):Promise<Order>{
        return await this.orderService.getOrderById(id);
    }
    @Post()
    async create(@GetUser('sub') userId: string, @Body() order: OrderDto): Promise<Order>{
        return await this.orderService.createOrder(userId, order);
    }

    @Patch('checkoutOrder')
    async checkOut(@Body() checkOutDTO : CheckOutDTO){
        return await this.orderService.checkOut(checkOutDTO);
    }
    @Patch()
    async updatePet(@Body() order: OrderDto): Promise<Order>{
        return await this.orderService.updateOrder(order);
    }

    @Patch('confirm')
    async confirm(@Body() confirmDTO : ConfirmDTO): Promise<Order>{
        return await this.orderService.confirmOrder(confirmDTO);
    }
    @Roles(Role.Admin)
    @Get('revenue-by-month')
    async getTotalRevenueByMonth() {
      return this.orderService.getTotalRevenueByMonth();
    }

    @Roles(Role.Admin)
    @Get('revenue-count-by-month')
    async getOrderCountByMonth() {
      return this.orderService.getOrderCountByMonth();
    }

}