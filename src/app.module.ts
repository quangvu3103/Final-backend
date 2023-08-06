import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './app/Pet/pet.module';


@Module({
  imports: [

    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule,
  UserModule,
  PrismaModule,
  CategoryModule,
  PetModule,
  
  ],
  controllers: [],
  providers: [],
 
})
export class AppModule {}
