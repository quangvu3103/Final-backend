/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class orderDetailsDto {
    @ApiProperty()
    orderId: string;
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsNumber()
    quantity: number;
    @ApiProperty()
    productId: string;

}