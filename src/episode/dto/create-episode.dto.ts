import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  episode_comments: string;

  @IsString()
  @Length(3, 50)
  episode_code: string;

  @IsString()
  @Length(3, 50)
  release_date: string;
}

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {}
