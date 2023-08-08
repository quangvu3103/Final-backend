import { ApiTags } from "@nestjs/swagger";
import { BrandService } from "./brand.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { Brand } from "@prisma/client";
import { brandDto } from "./brand.Dto";

@Controller('brand')
@ApiTags('Brand')
export class BrandController{
    constructor(
        private brandService : BrandService
    ){}

    @Get()
    async getAll():Promise<Brand[]>{
        return await this.brandService.getBrand();
    }
    
    @Post()
    async create(@Body() brand: brandDto): Promise<Brand>{
        return await this.brandService.createBrand(brand);
    }
}