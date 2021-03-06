import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(3, 250)
  comment: string;

  ipAddressLocation?: string;

  location?: string;

  episode: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
