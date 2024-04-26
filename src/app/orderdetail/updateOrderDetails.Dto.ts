
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class updateOrderDetailsDto {
    @ApiProperty()
    @IsNumber()
    quantity: number;
}