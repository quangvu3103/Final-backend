/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

  @ApiProperty()
  @IsString()
  name: string;
}