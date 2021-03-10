import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { HivePost } from './models/hive-post.model';
import { HivePostRequest } from './dtos/hive-post-request.dto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/feed/:authors')
  async getFeedByAuthors(
    @Param('authors') authors,
    @Query('start') start,
    @Query('limit') limit = 20,
    @Query('days') days = 45,
  ): Promise<HivePost[]> {
    return await this.postsService.feedByAuthors(
      authors.split(','),
      start > 0 ? start : 0,
      limit > 0 && limit <= 20 ? limit : 20,
      days > 0 && days <= 90 ? days : 45,
    );
  }

  @Get('/posts')
  async getPostsByPermlinks(
    @Query('permlinks') permlinks = '',
  ): Promise<HivePost[]> {
    return await this.postsService.postsByPermlinks(permlinks.split(','));
  }

  @Post('/posts')
  async fetchPostsByPermlinks(
    @Body() hivePostRequest: HivePostRequest,
  ): Promise<HivePost[]> {
    return await this.postsService.postsByPermlinks(hivePostRequest.permlinks);
  }

  @Get('/communities/:community/:author')
  async getPostInCommunityByAuthor(
    @Param('community') community,
    @Param('author') author,
    @Query('start') start,
    @Query('limit') limit = 20,
  ): Promise<HivePost[]> {
    return await this.postsService.postsInCommunityByAuthor(
      community,
      author,
      start > 0 ? start : 0,
      limit > 0 && limit <= 20 ? limit : 20,
    );
  }

  @Get('/communities/:community/created/:tag')
  async getPostInCommunityByTag(
    @Param('community') community,
    @Param('tag') tag,
    @Query('start') start,
    @Query('limit') limit = 20,
  ): Promise<HivePost[]> {
    return await this.postsService.postsInCommunityByTag(
      community,
      tag,
      start > 0 ? start : 0,
      limit > 0 && limit <= 20 ? limit : 20,
    );
  }
}
