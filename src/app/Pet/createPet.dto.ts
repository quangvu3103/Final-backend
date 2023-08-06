import { ApiProperty } from "@nestjs/swagger";

export class CreatePetDto{
@ApiProperty()
name: string;
categoryId: string;
}