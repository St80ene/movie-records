import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';

@Controller({
  path: '/locations',
})
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateLocationDto) {
    return this.locationService.create(req);
  }
}
