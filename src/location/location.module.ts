import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LocationController } from './location.controller';
import { LocationProvider } from './location.provider';
import { LocationService } from './location.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationController],
  providers: [...LocationProvider, LocationService],
  exports: [LocationService],
})
export class LocationModule {}
