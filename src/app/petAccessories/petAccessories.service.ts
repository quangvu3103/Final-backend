import { Injectable, Body } from "@nestjs/common";
import {  PetAccessories } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePetAccessoriesDto } from "./UpdatePetAccessories.dto";
import { CreatePetAccessoriesDto } from "./CreatePetAccessories.Dto";


@Injectable()
export class PetAccessoriesService{
    constructor(
        private prismaService : PrismaService,
    ){}

    async getPetAccessories():Promise<PetAccessories[]>{
        return await this.prismaService.petAccessories.findMany()
    }

    async createPetAccessories(@Body() petAccesories : CreatePetAccessoriesDto):Promise<PetAccessories> {
        return await this.prismaService.petAccessories.create({
            data: {
                ...petAccesories,
            },
        });
    }

    async updatePetAccessories(id: string, @Body() pet: UpdatePetAccessoriesDto): Promise<PetAccessories>{
        return await this.prismaService.petAccessories.update({
            where: {
                id: id,
            },
            data: {
                ...pet,
            },
        });
    }

    async deletePetAccessories(id: string){
        return await this.prismaService.petAccessories.delete({
            where: {
                id: id
            }
        });
    }
}