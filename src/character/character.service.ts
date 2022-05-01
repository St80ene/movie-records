import { Repository } from 'typeorm';
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
      throw new InternalServerErrorException();
    }
  }
}
