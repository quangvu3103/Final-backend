/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    transactionId?: string;


    @ApiProperty()
    orderId?: string;
    @ApiProperty()
    totalPrice?: number;
    @ApiProperty()
    quantity?: number;

    @ApiProperty()
    productId?: string;
}