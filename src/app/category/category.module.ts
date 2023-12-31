/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CategoryController } from "./categoy.controller";
import { CategoryService } from "./category.service";

@Module({
    imports:[],
    controllers: [CategoryController],
    providers: [CategoryService],
})

export class CategoryModule{}

