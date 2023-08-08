import { ApiProperty } from "@nestjs/swagger";

export class UpdatePetAccessoriesDto{
@ApiProperty()
    name: string;
    quantity: number;
    image: string;
    title: string;
    describe: string;
    brandId: string;
 }