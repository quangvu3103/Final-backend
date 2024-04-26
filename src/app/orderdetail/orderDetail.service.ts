/* eslint-disable prettier/prettier */
import { Order, OrderDetail } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { orderDetailsDto } from "./orderDetail.Dto";
import { Body, Injectable } from "@nestjs/common";
import { updateOrderDetailsDto } from "./updateOrderDetails.Dto";

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

    async updateOrderDetail(id: string, @Body() orderDetailDto : updateOrderDetailsDto): Promise<Order>{
        const orderDetail = await this.prismaService.orderDetail.findFirst({where: {id: id}, include:{
            product: true
        }});


         await this.prismaService.orderDetail.update({
            where:{
                id: id,
            },
            data: {
                quantity: orderDetailDto.quantity,
                price: orderDetail.product.price * orderDetailDto.quantity,
            },
        });
        const order = await this.prismaService.order.findFirst({
            where:{
                id: orderDetail.orderId,
                status: 'IN_PROGRESS'
            },
            include:{
                orderDetails: {
                    include:{
                        product: {
                            include:{
                                images:true
                            }
                        }
                    }
                }
            }
        })
        let price = 0;
        for(let i=0;i < order.orderDetails.length ; i++){
            price += order.orderDetails[i].price;
            
        }
        await this.prismaService.order.update({
                where:{
                    id: order.id
                },
                data:{
                    totalPrice:price
                }
            })
        return await this.prismaService.order.findFirst({
            where:{
                id: orderDetail.orderId,
                status: 'IN_PROGRESS'
            },
            include:{
                orderDetails: {
                    include:{
                        product: {
                            include:{
                                images:true
                            }
                        }
                    }
                }
            }
        })
    }

    async deleteOrderDetail(id: string): Promise<Order>{

        const orderDetail =  await this.prismaService.orderDetail.findUnique({
            where: {
                id: id
            }
        });

        const order =  await this.prismaService.order.findUnique({
            where:{
                id: orderDetail.orderId,
                status: 'IN_PROGRESS'
            },
            include:{
                orderDetails: {
                    include:{
                        product: {
                            include:{
                                images:true
                            }
                        }
                    }
                }
            }
        });
         await this.prismaService.orderDetail.delete({
            where:{
                id : id
            }
        })

         await this.prismaService.order.update({
            where: {
                id: order.id
            },data: {
                totalPrice : order.totalPrice - orderDetail.price
            }
        });
        return await this.prismaService.order.findUnique({
            where:{
                id: orderDetail.orderId,
                status: 'IN_PROGRESS'
            },
            include:{
                orderDetails: {
                    include:{
                        product: {
                            include:{
                                images:true
                            }
                        }
                    }, orderBy: {
                        id: 'asc' // hoặc 'desc' nếu bạn muốn sắp xếp theo thứ tự giảm dần
                      }
                },
                
            },
            
        });
    }
}