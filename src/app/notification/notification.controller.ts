/* eslint-disable prettier/prettier */

import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { MyJwtGuard } from 'src/common/guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { GetUser } from 'src/common/decorator';
import { SocketGateway } from 'src/provide/socket/gateway';



@Controller('notification')
@ApiTags('Notification')
@ApiBearerAuth('Jwt-auth')
@Roles(Role.User)
@UseGuards(MyJwtGuard, RolesGuard)
export class NotificationController{
    constructor(
        private notificationService : NotificationService,

    ){}

    @Get()
    async getByUser(@GetUser('sub') id: string){
        return await this.notificationService.getByUser(id)
    }

    // @Get()
    // async test()
        
}
