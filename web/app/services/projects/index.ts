import { TaskStatus, Task } from "../tasks";
import { User } from "../users";
import { Completion } from "../completions";
import ApiClient from "~/services/apiClient";

export interface Project {
  id: number;
  title: string;
  description: string;
  start_date: Date | number | string;
  end_date?: Date;
  progress: number;
  status: TaskStatus;
  user_id: number;
  user: User;
  Task?: Task[];
  Completion?: Completion[];
  name: string;
  lastCompletedTaskDays: number;
  lastTaskAddedDays: number;
  createdAtDays: number;
  taskCompletedCount: number;
  taskCount: number;
  isWorking: boolean;
  workingDays: number;
  completedTaskPercentage: number;
}

export interface NewProject {
  title: Project["title"];
  description: Project["description"];
  start_date: Project["start_date"];
  end_date?: Date;
}

class ProjectsService extends ApiClient {
  private path = "/projects";
  async getProjects() {
    return this.fetch(this.path);
  }

  async getProjectById(id: string) {
    return this.fetch(`${this.path}/${id}`);
  }

  async createProject(data: NewProject) {
    return this.fetch(this.path, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async changeWorkingStatus(id: string) {
    return this.fetch(`${this.path}/${id}/change-working`, {
      method: "GET",
    });
  }
}

export default ProjectsService;
