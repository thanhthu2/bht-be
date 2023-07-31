import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Post from './post.entity';
import { Pagination } from 'nestjs-typeorm-paginate';


@Injectable()
export default class PostsService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) { }


  async getAllPosts(page = 1, pageSize = 20) :Promise<Pagination<Post>> {
    const [results, totalItems] = await this.postsRepository
      .createQueryBuilder('post')
      .orderBy('post.updatedAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()

      return {
        items:results,
        meta: {
          totalItems,
          currentPage:page,
          itemCount:results.length,
          itemsPerPage:pageSize
        }
      }
    // return this.postsRepository.find();
  }


  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({
      id
    })
    if (post) return post
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOneBy({ id });
    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
