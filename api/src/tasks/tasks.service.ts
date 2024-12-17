import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './constants/task-status.constants';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto): Promise<any> {
    const data = {
      ...createTaskDto,
      status: TaskStatus.PENDING,
      progress_contribution: 0,
    };

    return prisma.task.create({
      data,
    });
  }
}
