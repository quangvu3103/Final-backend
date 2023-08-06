import {Controller, Get, UseGuards, Req} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import {MyJwtGuard} from '../auth/guard'
import { GetUser } from 'src/auth/decorator/user.decorator';

@Controller('user')
export class UserController {
    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User ){
        return user
    }
}