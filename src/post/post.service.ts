import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor( 
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>,
    private readonly entityMaanager:EntityManager) {}
  async create(createPostDto: CreatePostDto) {
    const post = this.entityMaanager.save(Post,createPostDto)
    return post
  }

  async findAll() {
    return this.postRepository.find()
  }

  async findOne(id: string) {
    return  this.postRepository.findOneBy({id})
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id,updatePostDto)
  }

  remove(id: string) {
    return this.postRepository.delete(id)
  }
}
