import { getSession } from "./auth/authCookie";

const { INTERNAL_API_URL } = process.env;

class ApiClient {
  private token: string | null = null;
  private URL = INTERNAL_API_URL;

  constructor(private request: Request) {}

  async checkIfAuthenticated() {
    const cookieHeader = this.request.headers.get("Cookie");
    const session = await getSession(cookieHeader);

    const savedToken = session.get("token");

    if (!savedToken) {
      return false;
    }

    try {
      await this.validateToken(savedToken);
      return true;
    } catch {
      return false;
    }
  }

  async init() {
    const cookieHeader = this.request.headers.get("Cookie");
    const session = await getSession(cookieHeader);

    if (!session.get("token")) {
      throw new Error("Unauthorized");
    }

    const savedToken = session.get("token");

    const validatedToken = await this.validateToken(savedToken);

    this.token = validatedToken;
  }

  async validateToken(token: string) {
    const response = await fetch(`${this.URL}/auth/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const { access_token } = await response.json();

    return access_token;
  }

  async getToken() {
    return this.token;
  }

  async fetch(endpointPath: string, options: RequestInit = {}) {
    if (!this.token) {
      throw new Error("Unauthorized");
    }

    await this.validateToken(this.token);

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${this.URL}${endpointPath}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }
}

export default ApiClient;
