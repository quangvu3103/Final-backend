import { Body, Injectable } from "@nestjs/common/decorators";
import { Brand } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { brandDto } from "./brand.Dto";


@Injectable()
export class BrandService{
    constructor(
        private prismaService: PrismaService,
    ){}

    async getBrand():Promise<Brand[]>{
        return await this.prismaService.brand.findMany()
    }

    async createBrand(@Body() brand : brandDto): Promise<Brand>{
        return await this.prismaService.brand.create({
            data: brand
        })
    }
}


