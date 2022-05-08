import { Repository, getRepository } from 'typeorm';
import { Character } from './entity/character.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('CHARACTER_REPOSITORY')
    private characterRepository: Repository<Character>,
  ) {}

  async create(createCharacterPayload: any): Promise<any> {
    try {
      const character = await this.characterRepository.save(
        createCharacterPayload,
      );

      return {
        status: true,
        message: 'Character created successfully',
        character,
      };
    } catch (error) {
      throw new InternalServerErrorException({ error: error.message });
    }
  }

  async findAll(query) {
    try {
      let limit = query.limit;
      const page = query.page;

      limit = limit > 100 ? 100 : limit;
      const pageNumber = page || 1;
      const skip = (pageNumber - 1) * limit;

      const result = await getRepository(Character)
        .createQueryBuilder('character')
        .leftJoinAndSelect('character.location', 'location')
        .skip(skip)
        .take(limit)
        .getRawMany();

      return result;
    } catch (error) {
      throw new InternalServerErrorException({ error: error.message });
    }
  }
}
