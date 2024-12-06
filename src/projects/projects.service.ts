import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './constants/project-status.constants';

const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {
  async create(createProjectDto: CreateProjectDto): Promise<any> {
    const data = {
      ...createProjectDto,
      status: ProjectStatus.PENDING,
    };

    return prisma.project.create({
      data,
    });
  }
}
