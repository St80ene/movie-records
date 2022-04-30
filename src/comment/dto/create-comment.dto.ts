import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(3, 250)
  comment: string;

  @IsNotEmpty()
  ipAddressLocation: string;
}

export class UpdateCalendarDto extends PartialType(CreateCommentDto) {}
