/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";
import { RegisterDTO } from "./dto/reigister.dto";

import { MailService } from "src/provide/mail/mail.service";
@Injectable({


})
export class authSevice {
    constructor(private prismaService: PrismaService,
                private jwtService: JwtService,
                private configService: ConfigService,
                private mailService : MailService
        ){

    }

    async register(authDTO: RegisterDTO){

        const hashedPassword = await argon.hash(authDTO.password)
        try{
    
        const user = await this.prismaService.user.create({
            data: {
                email: authDTO.email,
                password: hashedPassword,
                username: '',
            },
             select:{
                id: true,
                email: true,
             }
         })
         await this.prismaService.profile.create({
            data:{
                userId: user.id,
                fullName: authDTO.fullName,
                address: authDTO.address,
                phoneNumber: authDTO.phoneNumber,
                url: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                description: ''
            }
        })
        const role = await this.createRole(user.id)
        return await this.signJwtToken(user.id, user.email, role.name)
        }catch(error){
            if(error.code == 'P2002')
            throw new ForbiddenException('Error in credentials')
        }   

    }

    async createRole(userId: string){
        const role = await this.prismaService.role.findFirst({
            where:{
                name: "User"
            }
        })
        if(!role){
            throw new ForbiddenException("khong co id")
        }
        try{
            await this.prismaService.userRole.create({
                data: {
                    role: {
                        connect: {
                            id: role.id
                        }
                    },
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
    }catch{
        console.log("asd")
    }
    return role
    }

    async login(authDTO:AuthDTO){
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            },
            include:{
                userRole: true
            }
        })

        if(!user){
            throw new ForbiddenException(
                'User not found'
                )
            }
            const role = await this.prismaService.role.findUnique({
                where:{
                    id: user.userRole?.[0].roleId
                }
            })
        const passwordMatched = await argon.verify(
            user.password,
            authDTO.password
        )
        if(!passwordMatched){
            throw new ForbiddenException(
                'Incorrect password'
            )
        }
        delete user.password
        return await this.signJwtToken(user.id, user.email, role.name)
    }
    async signJwtToken(userId: string, email: string, role: string):Promise<{accessToken:string}>{
        const payload = {
            sub: userId,
            email,
            role
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '3h',
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        }
    }

    async resetPassword(email: string){
        const user = this.prismaService.user.findUnique({
            where:{
                email: email
            }
        })
        if(!user){
            throw new ForbiddenException('Not Found')
        }
        
        const randomNum = Math.floor(Math.random() * 1000000);
        const newPass = String(randomNum).padStart(6, '0')
        const hashedPassword = await argon.hash(newPass)
        await this.prismaService.user.update({
            where:{
                email: email
            },
            data:{
                password: hashedPassword
            }
        })
         this.mailService.sendEmail('quangvunguyen153@gmail.com', 'vunqgcd191153@fpt.edu.vn', "hello long ngu", `New password is ${newPass}`)
        return {msg: 'ok'} 
    }

}