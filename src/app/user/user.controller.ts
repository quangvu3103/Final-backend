/* eslint-disable prettier/prettier */
import {Controller, Get, UseGuards, Req, Post, Patch, Body} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { MyJwtGuard } from 'src/common/guard';
import { GetUser } from 'src/common/decorator/user.decorator';
import { ChangePasswordDTO } from './dto/updatePassword.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Jwt-auth')
@UseGuards(MyJwtGuard)
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User ){
        return user
    }

    @Patch('/changePassword')
    async changePassword(@GetUser('sub') id:string, @Body() password : ChangePasswordDTO  ){
        return await this.userService.changePassword(id, password)

    }
}