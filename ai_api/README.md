# Complit AI API

This API facilitates making requests to the Complit AI. Through an endpoint, you can send project details and the AI will respond with 4 or 5 task options that you can perform to complete that project.

## Features

- **Main Endpoint**: Allows sending project details.
- **AI Response**: Returns task options with specific details.
- **Built with**: NestJS.

## Requirements

- Node.js
- pnpm (Fast, disk space efficient package manager)

## Usage

1. Start the server:
  ```bash
  pnpm run start
  ```

2. Send a POST request to the endpoint `/api/project-details` with the following format:
  ```json
  {
    "projectName": "Project Name",
    "description": "Detailed description of the project"
  }
  ```

3. The response will be a JSON with 4 or 5 task options:
  ```json
  {
    "tasks": [
      {
        "taskName": "Task Name 1",
        "details": "Task details 1"
      },
      {
        "taskName": "Task Name 2",
        "details": "Task details 2"
      }
      // More tasks...
    ]
  }
  ```

## Building the API with NestJS

1. Create a new NestJS project:
  ```bash
  pnpm i -g @nestjs/cli
  nest new complit-ai-api
  ```

2. Define a controller to handle requests:
  ```typescript
  import { Controller, Post, Body } from '@nestjs/common';

  @Controller('api')
  export class ProjectDetailsController {
    @Post('project-details')
    getProjectDetails(@Body() projectDetails: any): any {
      // Logic to interact with the AI and get the tasks
      return {
        tasks: [
          { taskName: 'Task 1', details: 'Task details 1' },
          { taskName: 'Task 2', details: 'Task details 2' },
          // More tasks...
        ]
      };
    }
  }
  ```

3. Register the controller in the main module:
  ```typescript
  import { Module } from '@nestjs/common';
  import { ProjectDetailsController } from './project-details.controller';

  @Module({
    controllers: [ProjectDetailsController],
  })
  export class AppModule {}
  ```

4. Start the server:
  ```bash
  pnpm run start
  ```

## Contributions

If you wish to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.