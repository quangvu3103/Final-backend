import { Injectable, Body } from "@nestjs/common";
import { Pet } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import {CreatePetDto} from "./createPet.dto"
import { UpdatePetDto } from "./updatePet.dto";

@Injectable()
export class PetService{
    constructor(
        private prismaService : PrismaService,
    ){}

    async getPet():Promise<Pet[]>{
        return await this.prismaService.pet.findMany()
    }

    async createPet(@Body() pet : CreatePetDto):Promise<Pet> {
        return await this.prismaService.pet.create({
            data: {
                ...pet,
            },
        });
    }

    async updatePet(id: string, @Body() pet: UpdatePetDto): Promise<Pet>{
        return await this.prismaService.pet.update({
            where: {
                id: id,
            },
            data: {
                ...pet,
            },
        });
    }

    async deletePet(id: string){
        return await this.prismaService.pet.delete({
            where: {
                id: id
            }
        });
    }
}