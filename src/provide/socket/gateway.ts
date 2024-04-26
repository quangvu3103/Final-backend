/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { NotificationService } from "src/app/notification/notification.service";

@Injectable()
@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    private noficationService: NotificationService,
  ) {}
///websocket
  async handleConnection(socket: Socket) {
    socket.on('join', async (userId) => {
        console.log(userId)
        socket.join(userId); 
    });


  }
  async handleDisconnect(socket: Socket) {
    try {
        console.log(socket)
    } catch (error) {
      console.error("Error while removing user socket info:", error);
    }
  }
  
  async sendNotification(userId: string, title: string,action: string, id: string) {
    try {
      
      const notificationData = await this.noficationService.createNotification(userId, title, action, id);
      //evevnt
      this.server.to(userId).emit('notification-received', notificationData)
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  }
}