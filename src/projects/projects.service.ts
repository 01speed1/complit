import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './constants/project-status.constants';

const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {
  async findAllByUser(userId: number): Promise<any[]> {
    return prisma.project.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async create(createProjectDto: CreateProjectDto): Promise<any> {
    const data = {
      ...createProjectDto,
      status: ProjectStatus.PENDING,
      user_id: createProjectDto.user_id ?? undefined,
    };

    return prisma.project.create({ data });
  }
}
