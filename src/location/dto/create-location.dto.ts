import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
