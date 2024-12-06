import { Controller, Post, Body } from '@nestjs/common';
import { CompletionService } from './completion.service';
import { CreateCompletionDto } from './dto/create-completion.dto';

@Controller('completions')
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  @Post()
  async create(@Body() createCompletionDto: CreateCompletionDto) {
    return this.completionService.create(createCompletionDto);
  }
}
