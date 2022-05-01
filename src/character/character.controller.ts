import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller({
  path: '/characters',
})
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateCharacterDto) {
    return this.characterService.create(req);
  }
}
