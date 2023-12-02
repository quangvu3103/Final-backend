/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateProfileDTO{
    @IsString()
    @ApiProperty({

    })
    fullName?: string

    @IsString()
    @ApiProperty({
        
    })
    address?: string

    
    @IsString()
    @ApiProperty({
        
    })
    phoneNumber?: string


    @ApiProperty({
        
    })
    url?: string


    @ApiProperty({
        
    })
    description?: string



}   