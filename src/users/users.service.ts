import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }
  async findByEmailOrUsernae(emailOrUsername: string) {
    if (emailOrUsername.includes('@')) {
      return this.userRepository.findOneBy({ email: emailOrUsername });
    } else {
      return this.userRepository.findOneBy({ username: emailOrUsername });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.userRepository.update(id, updateUserDto);
    return updateUserDto;
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}
