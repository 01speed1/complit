import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCompletionDto } from './dto/create-completion.dto';

const prisma = new PrismaClient();

@Injectable()
export class CompletionService {
  async create(createCompletionDto: CreateCompletionDto): Promise<any> {
    return prisma.completion.create({
      data: createCompletionDto,
    });
  }
}
