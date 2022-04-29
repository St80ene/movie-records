import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  typeorm: {
    type: process.env.TYPEORM_TYPE?.length ? process.env.TYPEORM_TYPE : 'mysql',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT) || 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZATION),
  },
}));
