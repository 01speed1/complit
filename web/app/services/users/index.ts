import { Project } from "../projects";

export interface User {
  id: number;
  name: string;
  email: string;
  googleId: string;
  projects: Project[];
}

import ApiClient from "../apiClient";

class UsersService extends ApiClient {
  private path = "/users";

  async getUser() {
    return this.fetch(`${this.path}/info`);
  }

  /* async createUser(data: User) {
    return this.fetch(this.path, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } */
}

export default UsersService;
