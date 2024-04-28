/* eslint-disable prettier/prettier */
import { Body, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { Order, OrderDetail } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderDto } from "./order.Dto";
import { orderDetailsDto } from "../orderdetail/orderDetail.Dto";
import { ConfirmDTO } from "./confirm.dto";
import { CheckOutDTO } from "./checkOut.dto";
import { SocketGateway } from "src/provide/socket/gateway";
import moment from "moment-timezone"

@Injectable()
export class OrderService{
    constructor(
        private prismaService : PrismaService,
        @Inject(SocketGateway) private socketGateway: SocketGateway
    ){}

    
    async getOrders():Promise<Order[]>{
        return await this.prismaService.order.findMany({
            include:{
                user:{
                    include:{
                        profile:true
                    }
                },
                
            }

        })
    }

    async getOrdersByUser(id: string):Promise<Order[]>{
        return await this.prismaService.order.findMany({
            where:{
                userId:id,
            
            }
        })
    }

    async getCart(id: string):Promise<Order>{
        return await this.prismaService.order.findFirst({
            where:{
                userId: id,
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

    async createOrder(userId: string, @Body() orderDTO: OrderDto): Promise<Order> {
        const {quantity,productId, ...order} = orderDTO
        const currentOrder = await this.prismaService.order.findFirst({
            where: {
                userId: userId,
                status: 'IN_PROGRESS'
            }
        });

        let newOrder: any;
        if (!currentOrder) {
            const totalPrice = order.totalPrice * quantity
            newOrder = await this.prismaService.order.create({
                data: {
                    ...order,
                    dateOrder: new Date(),
                    userId : userId,
                    totalPrice: totalPrice
                }
            });
        } else {
            newOrder = await this.prismaService.order.findUnique({
                where:{
                    id:currentOrder.id
                }
            })
        }

        const product = await this.prismaService.product.findUnique({
            where:{
                id: productId
            }
        })
        const currentOrderDetails = await this.prismaService.orderDetail.findFirst({
            where:{
                productId: product.id,
                orderId:newOrder.id
            },
            include: {product: true}
        })
        if(currentOrderDetails){
            const quantity2 = currentOrderDetails.quantity + quantity
            await this.prismaService.orderDetail.update({
                where:{
                    id: currentOrderDetails.id
                },data:{
                    quantity :quantity2,
                    price: currentOrderDetails.product.price * quantity2
                }
            })
        }else{
            const totalPrice = product.price * quantity
            await this.prismaService.orderDetail.create({
                data:{
                    orderId: newOrder.id,
                    price: totalPrice,
                    quantity: quantity,
                    productId: productId
                }
            })
        }

        const totalOrderDetail = await this.prismaService.orderDetail.findMany({
            where:{
                orderId: newOrder.id
            }
        })
        let price = 0;
        for(let i=0;i < totalOrderDetail.length ; i++){
            price += totalOrderDetail[i].price;
            
        }await this.prismaService.order.update({
                where:{
                    id: newOrder.id
                },
                data:{
                    totalPrice:price
                }
            })
        return newOrder;
    }
    
    async updateOrder(@Body() orderDTO: OrderDto): Promise<Order>{
        const {quantity,productId, ...order} = orderDTO
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
                orderDetails:{
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

    }

    async confirmOrder(confirmDTO : ConfirmDTO):Promise<Order>{
        const vietnamTime = moment().tz('Asia/Ho_Chi_Minh');

        return await this.prismaService.order.update({
            where:{
                id: confirmDTO.id
            },
            data:{
                transactionId: confirmDTO.transactionId,
                dateOrder: vietnamTime.toDate()
            }
        })
    }


    async checkOut(checkOutDTO : CheckOutDTO) : Promise<Order>{        
        const vietnamTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
        
        const order =  await this.prismaService.order.update({
            where:{
                id: checkOutDTO.orderId
            },
            data:{
                transactionId: checkOutDTO.transactionId,
                status: 'DONE',
                dateOrder: new Date(vietnamTime).toISOString()
            },
            include:{
                user:{
                    select:{
                        id: true,
                        profile:{
                            select:{
                                fullName: true
                            }
                        }
                    }
                },
            }
        })
        await this.socketGateway.sendNotification(order.userId, `${order.user.profile.fullName} payment ${order.id} success` ,"Payment_Success", order.id)

        return order
    }

    async getTotalRevenueByMonth(): Promise<any> {
        const orders = await this.prismaService.order.findMany({
          select: {
            dateOrder: true,
            totalPrice: true,
          },
        });
    
        const revenueByMonth = orders.reduce((acc, order) => {
          const month = new Date(order.dateOrder).getMonth() + 1; // Lấy tháng từ dateOrder
          acc[month] = (acc[month] || 0) + order.totalPrice;
          return acc;
        }, {});
    
        // Chuyển đổi định dạng thành mảng
        return Object.entries(revenueByMonth).map(([month, revenue]) => ({
          month: parseInt(month),
          revenue,
        }));
      }
    
      async getOrderCountByMonth(): Promise<any> {
        const orders = await this.prismaService.order.findMany();
        const orderCountByQuarter: { [quarter: number]: number } = {};
    
        orders.forEach(order => {
            const quarter = this.getQuarter(new Date(order.dateOrder));
            if (orderCountByQuarter[quarter]) {
                orderCountByQuarter[quarter]++;
            } else {
                orderCountByQuarter[quarter] = 1;
            }
        });
    
        const result = Object.entries(orderCountByQuarter).map(([quarter, orderCount]) => ({
            quarter: parseInt(quarter),
            orderCount,
        }));
    
        return result;
      }

      getQuarter(date: Date): number {
        const month = date.getMonth();
        return Math.floor(month / 3) + 1;
    }
    

    
}