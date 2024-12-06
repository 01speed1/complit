import { ProjectStatus } from '../constants/project-status.constants';

export class CreateProjectDto {
  title: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  progress: number;
  status: ProjectStatus;
  user_id: number;
}
