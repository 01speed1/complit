import { Project } from "../projects";

export interface Completion {
  id: number;
  project_id: number;
  completion_date: Date;
  proof_url: string;
  proof_image: string;
  project: Project;
}
