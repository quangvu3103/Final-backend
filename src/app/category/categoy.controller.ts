/* eslint-disable prettier/prettier */

import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { categoryDto } from './category.Dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/updateCategory.dto';


@Controller('category')
@ApiTags('Category')
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
        return await this.categoryService.createCategory(category);
    }

    @Patch()
    async update(@Body() category : UpdateCategoryDto) : Promise<Category>{
        return await this.categoryService.updateCategory(category)
    }
    
     @Delete('/:id')
     async delete(@Param('id') id : string) {
        return await this.categoryService.deleteCategory(id)
     }
        
}
