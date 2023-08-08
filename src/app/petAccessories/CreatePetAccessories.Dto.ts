import { ApiProperty } from "@nestjs/swagger";

export class CreatePetAccessoriesDto{
@ApiProperty()
    name: string;
    quantity: number;
    image: string;
    title: string;
    describe: string;
    brandId: string;
}