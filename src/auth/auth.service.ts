import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";
@Injectable({


})
export class authSevice {
    constructor(private prismaService: PrismaService,
                private jwtService: JwtService,
                private configService: ConfigService
        ){

    }

    async register(authDTO: AuthDTO){

        const hashedPassword = await argon.hash(authDTO.password)
        try{
    
        const user = await this.prismaService.user.create({
            data: {
                email: authDTO.email,
                password: hashedPassword,
                username: '',
                address: '',
                phone: '', 
            },
             select:{
                id: true,
                email: true,
             }
         })
         await this.createRole(user.id)
        console.log(user)
        return await this.signJwtToken(user.id, user.email)
        }catch(error){
            if(error.code == 'P2002')
            console.log("loi cmnr")
            throw new ForbiddenException('Error in credentials')
        }   

    }

    async createRole(userId: string){
        const role = await this.prismaService.role.findFirst({
            where:{
                name: "Admin"
            }
        })
        if(!role){
            throw new ForbiddenException("khong co id")
        }
        try{
            const userRole = await this.prismaService.userRole.create({
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

    }
        return role
    }

    async login(authDTO:AuthDTO){
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        })
        if(!user){
            throw new ForbiddenException(
                'User not found'
            )
        }
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
        return await this.signJwtToken(user.id, user.email)
    }
    async signJwtToken(userId: string, email: string):Promise<{accessToken:string}>{
        const payload = {
            sub: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '10',
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        }
    }
}