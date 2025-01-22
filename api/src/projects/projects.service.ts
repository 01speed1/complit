import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './constants/project-status.constants';

const prisma = new PrismaClient();

@Injectable()
export class ProjectsService {
  async findAllByUser(userId: number): Promise<any[]> {
    const projects = await prisma.project.findMany({
      where: { user_id: userId },
      include: { Task: true },
    });

    function daysBetween(date1: Date, date2: Date): number {
      const diff = Math.abs(date2.getTime() - date1.getTime());
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    const now = new Date();

    return projects.map((project) => {
      const { Task } = project;
      const completedTasks = Task.filter((t) => t.status === 'Completed');
      const lastCompletedTask = completedTasks.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime(),
      )[0];
      const lastTaskAdded = Task.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime(),
      )[0];

      const completionPercentage =
        Task.length > 0
          ? Math.round((completedTasks.length * 100) / Task.length)
          : 0;

      const isAllCompleted =
        Task.length > 0 && Task.length === completedTasks.length;
      const status = isAllCompleted
        ? 'Completed'
        : project.is_working
          ? 'Working'
          : 'Pending';

      return {
        ...project,
        name: project.title,
        status,
        lastCompletedTaskDays: lastCompletedTask
          ? daysBetween(now, lastCompletedTask.created_at)
          : 0,
        lastTaskAddedDays: lastTaskAdded
          ? daysBetween(now, lastTaskAdded.created_at)
          : 0,
        createdAtDays: project.start_date
          ? daysBetween(now, project.start_date)
          : 0,
        taskCompletedCount: completedTasks.length,
        taskCount: Task.length,
        isWorking: project.is_working,
        Task: undefined,
        completedTaskPercentage: completionPercentage,
        workingDays:
          project.is_working_start_date &&
          daysBetween(now, project.is_working_start_date),
      };
    });
  }

  async findOneByUser(id: string, userId: number): Promise<any> {
    return prisma.project.findUnique({
      where: {
        id: parseInt(id, 10),
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

  async changeWorking(id: string, userId: number): Promise<any> {
    const currentWorkingProjects = await prisma.project.findMany({
      where: {
        user_id: userId,
        is_working: true,
      },
    });

    await prisma.project.updateMany({
      where: {
        id: { in: currentWorkingProjects.map((project) => project.id) },
      },
      data: {
        is_working: false,
        is_working_start_date: null,
      },
    });

    return prisma.project.update({
      where: {
        id: parseInt(id, 10),
        user_id: userId,
      },
      data: {
        is_working: true,
        is_working_start_date: new Date(),
      },
    });
  }
}
