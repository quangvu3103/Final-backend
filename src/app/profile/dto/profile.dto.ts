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

    @IsString()
    @ApiProperty({
        
    })
    url?: string

    @IsString()
    @ApiProperty({
        
    })
    description?: string



}   