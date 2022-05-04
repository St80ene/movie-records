import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
/* eslint-disable */
const ip = require('ip');

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentPayload: any): Promise<any> {
    try {
      createCommentPayload.ipAddressLocation = ip.address();
      const comment = await this.commentRepository.save(createCommentPayload);

      return { status: true, message: 'Comment created successfully', comment };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
