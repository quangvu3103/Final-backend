/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDTO{
    @IsString()
    @ApiProperty({

    })
    password?: string

    @IsString()
    @ApiProperty({

    })
    newPassword?: string
}