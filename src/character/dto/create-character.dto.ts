import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @Length(3, 50)
  first_name: string;

  @IsString()
  @Length(3, 50)
  last_name: string;

  @IsString()
  @Length(3, 50)
  status: string;

  @IsString()
  @Length(3, 50)
  state_of_origin: string;

  @IsString()
  @Length(3, 10)
  gender: string;

  episodes: string[];
}

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
