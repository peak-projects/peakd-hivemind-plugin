import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/feed/:authors')
  async getFeedByAuthors(@Param('authors') authors, @Query('page') page): Promise<Post[]> {
    return await this.postsService.feedByAuthors(authors.split(','), page);
  }

  @Get('/posts')
  async getPostsByPermlinks(@Query('permlinks') permlinks): Promise<Post[]> {
    return await this.postsService.postsByPermlinks(permlinks.split(','));
  }
}
