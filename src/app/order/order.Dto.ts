import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class OrderDto {
    @ApiProperty()
    dateOrder: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    @IsNumber()
    totalPrice: number;
}