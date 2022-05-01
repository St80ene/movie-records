import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentPayload: any): Promise<any> {
    try {
      const comment = await this.commentRepository.save(createCommentPayload);

      return { status: true, message: 'Comment created successfully', comment };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
