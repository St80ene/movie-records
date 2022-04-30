import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller({
  path: '/comments',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateCommentDto) {
    return this.commentService.create(req);
  }
}
