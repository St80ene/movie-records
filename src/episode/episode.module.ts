import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EpisodeController } from './episode.controller';
import { EpisodeProvider } from './episode.provider';
import { EpisodeService } from './episode.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EpisodeController],
  providers: [...EpisodeProvider, EpisodeService],
  exports: [EpisodeService],
})
export class EpisodeModule {}
