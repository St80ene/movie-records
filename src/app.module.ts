import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import db from './config/db';
import { CommentModule } from './comment/comment.module';
import { CharacterModule } from './character/character.module';
import { LOcationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [db],
    }),
    CommentModule,
    CharacterModule,
    LOcationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
