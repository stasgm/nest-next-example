import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  async getByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);

    const newuser = { ...user, ...updateUserDto };

    return await this.userRepository.save(newuser);
  }

  async deleteById(id: string): Promise<void> {
    const res = await this.userRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
