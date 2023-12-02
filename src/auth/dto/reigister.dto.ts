/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({

    })
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        
    })
    password: string


    @IsNotEmpty()
    @ApiProperty({

    })
    fullName: string


    @IsNotEmpty()
    @ApiProperty({
        
    })
    address: string



    @IsNotEmpty()
    @ApiProperty({
        
    })
    phoneNumber: string

}