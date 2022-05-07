import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodeService } from './episode.service';

@Controller({
  path: '/episodes',
})
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  async findAll(@Query() query) {
    return this.episodeService.findAll(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateEpisodeDto) {
    return this.episodeService.create(req);
  }

  @Delete(':id')
  async delete(@Param('id') episodeId: string) {
    return this.episodeService.delete(episodeId);
  }
}
