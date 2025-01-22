import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findByProjectId(@Query('project_id') projectId: string) {
    return this.taskService.findByProjectId(projectId);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteById(id);
  }
}
