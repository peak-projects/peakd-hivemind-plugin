import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HivePost } from './models/hive-post.model';
import { HivePostRequest } from './dtos/hive-post-request.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/feed/:authors')
  async getFeedByAuthors(@Param('authors') authors, @Query('start') start, @Query('limit') limit = 20): Promise<HivePost[]> {
    return await this.postsService.feedByAuthors(
      authors.split(','),
      start > 0 ? start : 0,
      limit > 0 && limit <= 20 ? limit : 20
    );
  }

  @Get('/posts')
  async getPostsByPermlinks(@Query('permlinks') permlinks): Promise<HivePost[]> {
    return await this.postsService.postsByPermlinks(permlinks.split(','));
  }

  @Post('/posts')
  async fetchPostsByPermlinks(@Body() hivePostRequest: HivePostRequest): Promise<HivePost[]> {
    return await this.postsService.postsByPermlinks(hivePostRequest.permlinks);
  }
}
