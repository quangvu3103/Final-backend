/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ImageDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;


}