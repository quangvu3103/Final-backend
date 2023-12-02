/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductImgController } from './productImg.controller';
import { ProductImgService } from './productImg.service';


@Module({
  imports: [],
  controllers: [ProductImgController],
  providers: [ProductImgService],
})
export class ProductImgModule {}
