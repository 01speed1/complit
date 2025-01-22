import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/info')
  @UseGuards(AuthGuard('jwt'))
  async find(@Req() req) {
    const id = req.user.userId;

    const payload: FindUserDto = {
      id,
    };

    const foundUser = await this.usersService.find(payload);

    return { name: foundUser.name, email: foundUser.email };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return { message: 'Usuario creado exitosamente' };
  }
}
