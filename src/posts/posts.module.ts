import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HivePost } from './models/hive-post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [SequelizeModule.forFeature([HivePost])],
    providers: [PostsService],
    controllers: [PostsController],
  })
export class PostsModule {}