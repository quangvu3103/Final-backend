/* eslint-disable prettier/prettier */
import { Body, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Category, Notification } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { SocketGateway } from "src/provide/socket/gateway";


@Injectable()
export class NotificationService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getByUser(id: string):Promise<Notification[]>{
        return await this.prismaService.notification.findMany({
            where:{
                userId: id
            }
        })
    }

    async createNotification(userId: string, title: string,action: string, actionId: string):Promise<Notification>{
        return await this.prismaService.notification.create({
            data:{
                userId: userId,
                title: title,
                action: action,
                actionId: actionId
            }
        })
    }

    async test(){
        // return await this.socketGateway.sendNotification("123","123","123","!23");
    }
}