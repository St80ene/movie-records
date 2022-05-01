import { Connection } from 'typeorm';
import { Character } from './entity/character.entity';

export const CharacterProvider = [
  {
    provide: 'CHARACTER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Character),
    inject: ['DATABASE_CONNECTION'],
  },
];
