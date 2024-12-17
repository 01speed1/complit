import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor() {}

  async findAll(): Promise<Omit<User, "googleId">[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  }

  async find(findUserDto: FindUserDto): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: findUserDto.id },
          { googleId: findUserDto.googleId },
          { email: findUserDto.email },
        ],
      },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await prisma.user.create({
      data: createUserDto,
    });
    return newUser;
  }
}
