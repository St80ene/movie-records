import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller({
  path: '/characters',
})
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async findAll(@Query() query) {
    return this.characterService.findAll(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateCharacterDto) {
    return this.characterService.create(req);
  }
}
