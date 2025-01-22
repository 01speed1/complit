import { Project } from "../projects/";
import ApiClient from "../apiClient";

export enum TaskStatus {
  Pending = "Pending",
  Working = "Working",
  Completed = "Completed",
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  progress_contribution: number;
  status: TaskStatus;
  due_date?: Date;
  project: Project;
}

export interface CreateTask {
  title: Task["title"];
  description: Task["description"];
  project_id: Task["project_id"];
}

class TasksService extends ApiClient {
  private path = "/tasks";

  async getTasks() {
    return this.fetch(this.path);
  }

  async getTaskByProjectId(id: string) {
    return this.fetch(`${this.path}/?project_id=${id}`);
  }

  async createTask(data: CreateTask) {
    return this.fetch(this.path, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    return this.fetch(`${this.path}/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async deleteTask(id: string) {
    return this.fetch(`${this.path}/${id}`, {
      method: "DELETE",
    });
  }
}

export default TasksService;
