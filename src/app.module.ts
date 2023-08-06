import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [

    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  UserModule,
  PrismaModule,
  CategoryModule,
  ],
  controllers: [],
  providers: [],
 
})
export class AppModule {}
