import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {ProductModule } from './app/Product/product.module';
import { OrderModule } from './app/order/order.module';
import { OrderDetailModule } from './app/orderdetail/orderDetail.module';


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

  
  ],
  controllers: [],
  providers: [],
 
})
export class AppModule {}
