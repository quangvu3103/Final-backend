/* eslint-disable prettier/prettier */
import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { categoryDto } from "./category.Dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";

@Injectable()
export class CategoryService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getCategory(): Promise<Category[]> {
        return await this.prismaService.category.findMany()
    }

    async createCategory(@Body() category: categoryDto): Promise<Category> {
        return await this.prismaService.category.create({
            data: category
        })
    }

    async updateCategory(@Body() categoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.prismaService.category.findUnique({
            where: {
                id: categoryDto.id
            }
        })
        if (!category) {
            throw new NotFoundException("Not Found Category")
        }
        return await this.prismaService.category.update({
            where: {
                id: category.id
            },
            data: {
                ...categoryDto
            }
        })
    }
    async deleteCategory(id: string) {
        return await this.prismaService.category.delete({
            where: {
                id: id
            }
        })
    }
}