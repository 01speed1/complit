import { TaskStatus } from '../constants/task-status.constants';

export class CreateTaskDto {
  project_id: number;
  title: string;
  description: string;
  progress_contribution: number;
  status?: TaskStatus;
  due_date?: Date;
}
