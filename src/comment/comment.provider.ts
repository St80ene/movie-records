import { Connection } from 'typeorm';
import { Comment } from './entity/comment.entity';

export const CommentProvider = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Comment),
    inject: ['DATABASE_CONNECTION'],
  },
];
