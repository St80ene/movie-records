import { Repository } from 'typeorm';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Episode } from './entity/episode.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @Inject('EPISODE_REPOSITORY')
    private episodeRepository: Repository<Episode>,
  ) {}

  async create(createEpisodePayload: any): Promise<any> {
    try {
      const episode = await this.episodeRepository.save(createEpisodePayload);

      return { status: true, message: 'Episode created successfully', episode };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
