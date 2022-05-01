import { Connection } from 'typeorm';
import { Location } from './entity/location.entity';

export const LocationProvider = [
  {
    provide: 'LOCATION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Location),
    inject: ['DATABASE_CONNECTION'],
  },
];
