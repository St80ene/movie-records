import { Repository, getRepository } from 'typeorm';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { paginateResponseData } from '../utils/file';

@Injectable()
export class EpisodeService {
  constructor(
    @Inject('EPISODE_REPOSITORY')
    private episodeRepository: Repository<Episode>,
  ) {}

  async create(createEpisodePayload: any): Promise<any> {
    try {
      let { release_date } = createEpisodePayload;

      // release_date is converted
      // into a string using toISOString() function.
      release_date = new Date(release_date).toISOString();

      const episode = await this.episodeRepository.save({
        name: createEpisodePayload.name,
        code: createEpisodePayload.code,
        release_date,
      });

      return { status: true, message: 'Episode created successfully', episode };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'InternalServerErrorException',
        error: error.message,
      });
    }
  }

  async findAll(query) {
    try {
      const data = await getRepository(Episode)
        .createQueryBuilder('episode')
        .leftJoinAndSelect('episode.comments', 'episode_comments')
        .leftJoinAndSelect('episode.characters', 'episode_characters')
        .select('episode.id')
        .groupBy('episode.id')
        .addSelect('COUNT(DISTINCT(episode_comments.id)) as numberOfComments')
        .orderBy('episode.release_date', 'DESC')
        .addSelect('episode.name', 'name')
        .addSelect('episode.release_date', 'release_date')
        .addSelect('episode.code', 'code')
        .getRawMany();
      return { status: true, message: 'List of Episodes', data };
    } catch (error) {
      throw new InternalServerErrorException({ error: error.message });
    }
  }

  async delete(episodeId: string) {
    try {
      const existingEpisodeRecord = await this.episodeRepository.findOne({
        id: episodeId,
      });

      if (existingEpisodeRecord === undefined) {
        throw new NotFoundException({ message: 'Episode not found' });
      }
      await this.episodeRepository.delete(episodeId);
      return {
        status: true,
        message: 'Episode deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error deleting Episode appointment',
        error: error.message,
      });
    }
  }
}
