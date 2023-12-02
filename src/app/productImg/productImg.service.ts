/* eslint-disable prettier/prettier */
import { Injectable, Body } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ImageDto } from "./dto/image.dto";
import { ProductImg } from "@prisma/client";

@Injectable()
export class ProductImgService{
  constructor(
    private prismaService: PrismaService
    ) {}

    async addImageToProduct(imageDTO: ImageDto):Promise<ProductImg>{
        return await this.prismaService.productImg.create({
            data: {
                ...imageDTO
            }
        })
    }
}