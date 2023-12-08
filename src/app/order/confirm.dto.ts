/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ConfirmDTO {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    transactionId?: string;

}