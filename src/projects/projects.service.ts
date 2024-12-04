import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';

const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {
  async create(createProjectDto: CreateProjectDto): Promise<any> {
    return prisma.project.create({
      data: createProjectDto,
    });
  }
}
