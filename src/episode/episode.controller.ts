import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodeService } from './episode.service';

@Controller({
  path: '/comments',
})
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateEpisodeDto) {
    return this.episodeService.create(req);
  }
}
