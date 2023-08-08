import { Module } from "@nestjs/common";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";



@Module({
    imports:[],
    controllers: [BrandController],
    providers: [BrandService],
})

export class BrandModule{}