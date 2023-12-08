/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";


export class CheckOutDTO {
    @ApiProperty()
    transactionId?: string;
    @ApiProperty()
    orderId?: string;
}