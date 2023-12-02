import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ResetDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({

    })
    email: string

}