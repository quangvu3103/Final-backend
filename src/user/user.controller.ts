/* eslint-disable prettier/prettier */
import {Controller, Get, UseGuards, Req} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import {MyJwtGuard} from '../common/guard'
import { GetUser } from 'src/common/decorator/user.decorator';

@Controller('user')
export class UserController {
    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User ){
        return user
    }
}