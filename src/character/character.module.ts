import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CharacterController } from './character.controller';
import { CharacterProvider } from './character.provider';
import { CharacterService } from './character.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CharacterController],
  providers: [...CharacterProvider, CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
