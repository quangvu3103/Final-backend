/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { authSevice } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../common/strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers:[AuthController ],
    providers: [authSevice, JwtStrategy ]

})

export class AuthModule {}