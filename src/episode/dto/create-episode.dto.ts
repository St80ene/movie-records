import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  code: string;

  release_date: Date;
}

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {}
