import { Connection } from 'typeorm';
import { Episode } from './entity/episode.entity';

export const EpisodeProvider = [
  {
    provide: 'EPISODE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Episode),
    inject: ['DATABASE_CONNECTION'],
  },
];
