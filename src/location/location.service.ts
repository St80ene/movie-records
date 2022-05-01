import { Repository } from 'typeorm';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Location } from './entity/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATION_REPOSITORY')
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationPayload: any): Promise<any> {
    try {
      const location = await this.locationRepository.save(
        createLocationPayload,
      );

      return {
        status: true,
        message: 'Location created successfully',
        location,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
