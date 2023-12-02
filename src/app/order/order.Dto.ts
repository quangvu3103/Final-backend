/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDto {
    @ApiProperty()
    dateOrder: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    @IsNumber()
    totalPrice: number;

    @IsString()
    @IsNotEmpty()
    transactionId: string;
}