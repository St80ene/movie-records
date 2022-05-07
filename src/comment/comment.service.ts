import { getRepository, Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  getGeoCoordinates,
  paginateResponseData,
  getIpAddress,
} from '../utils/file';
import { Location } from '../location/entity/location.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentPayload: any): Promise<any> {
    try {
      const { data: address } = await getIpAddress();

      const { data: coordinates } = await getGeoCoordinates(address?.ip);
      const location = await getRepository(Location).save({
        name: coordinates.region,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      createCommentPayload.location = location.id;
      createCommentPayload.ipAddressLocation = coordinates.ip;

      const comment = await this.commentRepository.save(createCommentPayload);
      return { status: true, message: 'Comment created successfully', comment };
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

      const result = await getRepository(Comment)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.episode', 'episode_comments')
        .leftJoinAndSelect('comment.location', 'comments_location')
        .orderBy('comment.ipAddressLocation', 'DESC')
        .addOrderBy('comment.createdAt', 'DESC')
        // .skip(skip)
        // .take(limit)
        .getRawMany();

      return result;
    } catch (error) {
      throw new InternalServerErrorException({ error: error.message });
    }
  }
}
