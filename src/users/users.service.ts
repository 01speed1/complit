import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor() {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await prisma.user.create({
      data: createUserDto,
    });
    return newUser;
  }
}
