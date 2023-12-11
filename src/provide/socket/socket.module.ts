/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './gateway';
import { NotificationService } from 'src/app/notification/notification.service';


@Global()
@Module({
  providers: [SocketGateway, NotificationService],
  exports: [SocketGateway],
})
export class SocketModule {}