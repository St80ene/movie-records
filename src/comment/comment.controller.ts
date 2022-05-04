import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller({
  path: '/comments',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Query() query) {
    return this.commentService.findAll(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() req: CreateCommentDto) {
    return this.commentService.create(req);
  }
}
