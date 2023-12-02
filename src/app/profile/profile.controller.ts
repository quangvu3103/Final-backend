/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Query, Param, UseGuards, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Role } from "src/common/enums/role.enum";
import { MyJwtGuard } from "src/common/guard";
import { RolesGuard } from "src/common/guard/roles.guard";
import { ProfileService } from "./profile.service";
import { GetUser } from "src/common/decorator";
import { UpdateProfileDTO } from "./dto/profile.dto";

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth('Jwt-auth')

@UseGuards(MyJwtGuard)
export class ProfileController{
    constructor(
        private profileService : ProfileService
    ){}
    
    @Get()
    async GetMyProfile(@GetUser('sub') id:string){
        return this.profileService.getMyProfile(id)
    }

    @Patch()
    async UpdateProfule(@GetUser('sub') id:string, @Body() profileDTO: UpdateProfileDTO){
        return this.profileService.updateProfile(id, profileDTO)
    }



}