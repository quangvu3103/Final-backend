/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
 export class UpdateProductDto{
@ApiProperty()
    
    name?: string;
    categoryId: string;
 }