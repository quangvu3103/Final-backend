import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PetAccessoriesService } from "./petAccessories.service";
import { PetAccessories } from "@prisma/client";
import { CreatePetAccessoriesDto } from "./CreatePetAccessories.Dto";
import { UpdatePetAccessoriesDto } from "./UpdatePetAccessories.dto";

@Controller('petAccessories')
@ApiTags('PetAccessories')
export class PetAccessoriesController{
    constructor(
        private petService : PetAccessoriesService
    ){}
    
    @Get()
    async getAll():Promise<PetAccessories[]>{
        return await this.petService.getPetAccessories();
    }

    @Post()
    async create(@Body() pet: CreatePetAccessoriesDto): Promise<PetAccessories>{
        return await this.petService.createPetAccessories(pet);
    }

    @Put(':id')
    async updatePetAccessories(@Query('id') id: string,@Body() pet: UpdatePetAccessoriesDto): Promise<PetAccessories>{
        return await this.updatePetAccessories(id, pet);
    }

    @Delete(':id')
    async deletePet(@Query('id') id: string){
        return await this.deletePet(id);
    }
}