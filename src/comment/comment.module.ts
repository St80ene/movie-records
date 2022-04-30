import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CommentController } from './comment.controller';
import { CommentProvider } from './comment.provider';
import { CommentService } from './comment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [...CommentProvider, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
