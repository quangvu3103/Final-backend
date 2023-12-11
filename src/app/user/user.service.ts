/* eslint-disable prettier/prettier */
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { ChangePasswordDTO } from "./dto/updatePassword.dto";
import { SocketGateway } from "src/provide/socket/gateway";




@Injectable()
export class UserService{
    constructor(
        private prismaService : PrismaService,
        @Inject(SocketGateway) private socketGateway: SocketGateway
    ){}

    async changePassword(id: string, changePasswordDTO: ChangePasswordDTO) : Promise<User>{
        const user = await this.prismaService.user.findUnique({
            where:{
                id : id
            }
        })
        if(!user){
            throw new ForbiddenException(
                'User not found'
            )
        }

        const authPassword = await argon.verify(
            user.password,
            changePasswordDTO.password,
        )
            if(!authPassword){
                throw new ForbiddenException(
                'Password incorrect'
                )
            }

        const hashedPassword = await argon.hash(changePasswordDTO.newPassword)


        
        return await this.prismaService.user.update({
            where:{
                id : id,
            },data:{
                password : hashedPassword
            }
        })
        

        
        
    }
}