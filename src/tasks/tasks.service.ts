import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto): Promise<any> {
    return prisma.task.create({
      data: createTaskDto,
    });
  }
}
