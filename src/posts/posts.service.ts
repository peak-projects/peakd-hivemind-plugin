import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { prepare } from 'src/utils/strings';
import { Post } from './models/post.model';

const FEED_BY_AUTHORS = `
SELECT p.*
FROM hive_posts_view p
where p.depth = 0
  and p.author in ('{authors}')
order by p.created_at desc
limit {limit}
offset {offset}
`;

const POSTS_BY_PERMLINKS = `
SELECT p.*,
	     h.author_s_permlink
FROM hive_posts_view p
JOIN hive_posts_api_helper h on h.id = p.id
WHERE p.depth = 0
      and h.author_s_permlink in ('{permlinks}')
`;

const PAGE_SIZE = 20;

@Injectable()
export class PostsService {
  constructor(private sequelize: Sequelize, @InjectModel(Post) private postModel: typeof Post) {}

  async feedByAuthors(authors: string[], page: number = 0): Promise<Post[]> {
    const query = prepare(FEED_BY_AUTHORS, {
      authors: authors.join('\',\''),
      offset: page * PAGE_SIZE,
      limit: PAGE_SIZE
    });
    return await this.sequelize.query(query, {
      model: Post
    });
  }

  async postsByPermlinks(permlinks: string[]): Promise<Post[]> {
    const query = prepare(POSTS_BY_PERMLINKS, { permlinks: permlinks.join('\',\'') });
    return await this.sequelize.query(query, {
      model: Post
    });
  }
}
