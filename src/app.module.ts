import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/category/category.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule,
  CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
