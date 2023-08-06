import { Controller, Get, Post, Body, Put, Delete, Query } from "@nestjs/common";
import { PetService } from "./pet.sevice"
import { CreatePetDto } from "./createPet.dto";
import { Pet } from "@prisma/client";
import { UpdatePetDto } from "./updatePet.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('pet')
@ApiTags('Pet')
export class PetController{
    constructor(
        private petService : PetService
    ){}
    
    @Get()
    async getAll():Promise<Pet[]>{
        return await this.petService.getPet();
    }

    @Post()
    async create(@Body() pet: CreatePetDto): Promise<Pet>{
        return await this.petService.createPet(pet);
    }

    @Put(':id')
    async updatePet(@Query('id') id: string,@Body() pet: UpdatePetDto): Promise<Pet>{
        return await this.updatePet(id, pet);
    }

    @Delete(':id')
    async deletePet(@Query('id') id: string){
        return await this.deletePet(id);
    }
}