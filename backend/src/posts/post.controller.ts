import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Body,
  Param,
  Put,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { postDto } from 'src/dto/post.dto';
import { Post as PostEntity } from 'src/entities/posts.entity';
import { PostService } from './post.service';
import { getUser } from 'src/auth/decorator/get-user.decorator';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async allPosts(@Query('userId') userId?: number) {
    const posts = await this.postService.findAllPosts(userId);

    return posts;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addPost(
    @Body() post: postDto,
    @getUser('id') userId: number,
  ): Promise<{ data: PostEntity; message: string }> {
    const added = await this.postService.createPost(post, userId);

    return { data: added, message: 'post added successfully' };
  }

  @Get(':id')
  async OnePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    const post = await this.postService.findOnePost(id);

    if (!post) throw new NotFoundException(`This post does not exist`);

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async removePost(
    @Param('id', ParseIntPipe) id: number,
    @getUser('id') userId: number,
  ) {
    const isDeleted = await this.postService.deletePost(id, userId);

    if (!isDeleted) throw new NotFoundException('This post does not exist');

    return { message: 'post deleted successfully' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':postId')
  async editPost(
    @Param('postId', ParseIntPipe) id: number,
    @Body() post: postDto,
    @getUser('id') userId: number,
  ): Promise<PostEntity> {
    const updated = await this.postService.updatePost(id, userId, post);

    if (!updated) throw new NotFoundException('Post does not exist!');

    return updated;
  }
}
