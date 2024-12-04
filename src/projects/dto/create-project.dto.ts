export class CreateProjectDto {
  title: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  progress: number;
  status: string;
  user_id: number;
}
