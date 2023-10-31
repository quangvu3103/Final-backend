import { Body, Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { categoryDto } from "./category.Dto";

@Injectable()
export class CategoryService{
    constructor(
        private prismaService : PrismaService,
    ){}

    async getCategory():Promise<Category[]>{
        return await this.prismaService.category.findMany()
    }

    async createCategory(@Body() category :categoryDto): Promise<Category>{
        return await this.prismaService.category.create({
            data:category
        })
    }
}