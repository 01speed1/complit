export class CreateTaskDto {
  project_id: number;
  title: string;
  description: string;
  progress_contribution: number;
  status: string;
  due_date?: Date;
}
