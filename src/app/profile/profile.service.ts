/* eslint-disable prettier/prettier */
import { Body, Injectable } from "@nestjs/common";
import { Order, Profile, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProfileDTO } from "./dto/profile.dto";





@Injectable()
export class ProfileService{
    constructor(
        private prismaService : PrismaService,
    ){}

    async getMyProfile(id: string):Promise<Profile>{
        return await this.prismaService.profile.findUnique({
            where:{
                userId: id
            }
        })
    }
    
    async updateProfile(id: string, profileDTO: UpdateProfileDTO ): Promise<Profile>{
        return await this.prismaService.profile.update({
            where:{
                userId: id
            },
            data:{
                ...profileDTO
            }
        })
    }

    
}