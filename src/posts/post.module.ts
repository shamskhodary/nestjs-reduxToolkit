import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postsProviders } from './posts.provider';

@Module({
  controllers: [PostController],
  providers: [PostService, ...postsProviders],
})
export class PostModule {}
