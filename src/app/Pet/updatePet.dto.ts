import { ApiProperty } from "@nestjs/swagger";
 export class UpdatePetDto{
@ApiProperty()
    
    name?: string;
    categoryId: string;
 }