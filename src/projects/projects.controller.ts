import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProjectDto: CreateProjectDto, @Request() request) {
    createProjectDto.user_id = request.user.userId;
    return this.projectsService.create(createProjectDto);
  }
}
