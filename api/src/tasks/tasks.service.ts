import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './constants/task-status.constants';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  async findByProjectId(projectId: string): Promise<any> {
    return prisma.task.findMany({
      where: {
        project_id: parseInt(projectId, 10),
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<any> {
    return prisma.task.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        status,
      },
    });
  }

  async create(createTaskDto: CreateTaskDto): Promise<any> {
    const data = {
      ...createTaskDto,
      project_id: +createTaskDto.project_id,
      status: TaskStatus.PENDING,
      progress_contribution: 0,
      created_at: new Date(),
    };

    return prisma.task.create({
      data,
    });
  }

  async deleteById(id: string): Promise<any> {
    return prisma.task.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
  }
}
