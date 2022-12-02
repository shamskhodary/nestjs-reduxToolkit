import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Body,
  Request,
  Param,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { postDto } from 'src/dto/post.dto';
import { Post as PostEntity } from 'src/entities/posts.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async allPosts() {
    const posts = await this.postService.findAllPosts();

    return posts;
  }

  @Get(':id')
  async OnePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    const post = await this.postService.findOnePost(id);

    if (!post) throw new NotFoundException(`This post does not exist`);

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addPost(
    @Body() post: postDto,
    @Request() req,
  ): Promise<{ data: PostEntity; message: string }> {
    const added = await this.postService.createPost(post, req.user.id);

    return { data: added, message: 'post added successfully' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async removePost(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const isDeleted = await this.postService.deletePost(id, req.user.id);

    if (!isDeleted) throw new NotFoundException('This post does not exist');

    return { message: 'post deleted successfully' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':postId')
  async editPost(
    @Param('postId', ParseIntPipe) id: number,
    @Body() post: postDto,
    @Request() req,
  ): Promise<PostEntity> {
    const updated = await this.postService.updatePost(id, req.user.id, post);

    if (!updated) throw new NotFoundException('Post does not exist!');

    return updated;
  }
}
