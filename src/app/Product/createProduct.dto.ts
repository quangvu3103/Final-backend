/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateProductDto{
@ApiProperty()
    name: string;
    @ApiProperty()
    categoryId: string;
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    description:string;
    @ApiProperty()
    quantity: number

}