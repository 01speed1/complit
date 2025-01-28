import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Request() request) {
    const userId = request.user.userId;
    return this.projectsService.findAllByUser(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Request() request) {
    const userId = request.user.userId;
    return this.projectsService.findOneByUser(id, userId);
  }

  @Get(':id/change-working')
  @UseGuards(AuthGuard('jwt'))
  async changeWorking(@Param('id') id: string, @Request() request) {
    const userId = request.user.userId;
    return this.projectsService.changeWorking(id, userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProjectDto: CreateProjectDto, @Request() request) {
    createProjectDto.user_id = request.user.userId;
    createProjectDto.start_date = new Date(createProjectDto.start_date);
    return this.projectsService.create(createProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @Request() request) {
    const userId = request.user.userId;
    return this.projectsService.deleteProjectAndTasks(id, userId);
  }
}
