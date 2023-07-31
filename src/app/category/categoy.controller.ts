
import {Body, Controller, Get, Post} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { categoryDto } from './categoryDto';


@Controller('category')
export class CategoryController{
    constructor(
        private categoryService : CategoryService
    ){}

    @Get()
    async getAll():Promise<Category[]>{
        return await this.categoryService.getCategory();
    }
    
    @Post()
    async create(@Body() category: categoryDto): Promise<Category>{
        return this.categoryService.createCategory(category);
    }
}