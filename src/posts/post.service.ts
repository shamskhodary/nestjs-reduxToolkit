import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY } from 'src/core/constants';
import { postDto } from 'src/dto/post.dto';
import { Post } from 'src/entities/posts.entity';
import { User } from 'src/entities/users.entity';

@Injectable()
export class PostService {
  constructor(@Inject(POST_REPOSITORY) private postRepository: typeof Post) {}

  async createPost(post: postDto, userId: number): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post, userId });
  }

  async findAllPosts(): Promise<Post[]> {
    return await this.postRepository.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'gender'],
          },
        },
      ],
    });
  }

  async findOnePost(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'updatedAt', 'createdAt', 'gender'],
          },
        },
      ],
    });
  }

  async deletePost(id: number, userId: number): Promise<number> {
    return await this.postRepository.destroy({
      where: { id, userId },
    });
  }

  async updatePost(
    postId: number,
    userId: number,
    post: postDto,
  ): Promise<Post> {
    const [rows, [updated]] = await this.postRepository.update(
      { ...post },
      { where: { id: postId, userId }, returning: true },
    );

    return updated;
  }
}
