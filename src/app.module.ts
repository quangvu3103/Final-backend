/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {ProductModule } from './app/product/product.module';
import { OrderModule } from './app/order/order.module';
import { OrderDetailModule } from './app/orderdetail/orderDetail.module';
import { MailModule } from './provide/mail/mail.module';
import { ProfileModule } from './app/profile/profile.module';
import { FileModule } from './app/file/file.module';
import { S3Module } from './provide/s3/s3.module';


@Module({
  imports: [

    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  UserModule,
  PrismaModule,
  CategoryModule,
  ProductModule,
  OrderModule,
  OrderDetailModule,
  MailModule,
  ProfileModule,
  FileModule,
  S3Module
  
  ],
  controllers: [],
  providers: [],
 
})
export class AppModule {}
