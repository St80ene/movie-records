import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @Length(50)
  first_name: string;

  @IsString()
  @Length(50)
  last_name: string;

  @IsString()
  @Length(50)
  status: string;

  @IsString()
  @Length(50)
  state_of_origin: string;

  @IsString()
  @Length(50)
  gender: string;

  @IsString()
  @Length(50)
  episodes: string[];
}

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
