import { getRepository, Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
/* eslint-disable */
const ip = require('ip');
import { getGeoCoordinates, paginateResponseData } from '../utils/file';
import { Location } from '../location/entity/location.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentPayload: any): Promise<any> {
    try {
      createCommentPayload.ipAddressLocation = ip.address();
      const geoLocation = await getGeoCoordinates(
        createCommentPayload.ipAddressLocation,
      );

      const location = await getRepository(Location).save({
        name: geoLocation.country,
        latitude: geoLocation.lat,
        longitude: geoLocation.lng,
      });

      createCommentPayload.location = location.id;

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

      const [data, total] = await this.commentRepository.findAndCount({
        take: limit,
        skip,
        relations: ['episodes', 'location'],
      });

      return paginateResponseData({
        data,
        total,
        limit,
        pageNumber,
        message: 'Records retrieved successfully',
      });
    } catch (error) {
      throw new InternalServerErrorException({ error: error.message });
    }
  }
}
