import { redirect } from "@remix-run/node";
import ProjectsService from "~/services/projects";

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function action({ request, params }) {
  const projectService = new ProjectsService(request);

  const { id } = params;

  switch (request.method) {
    case "POST":
      try {
        await projectService.init();
      } catch {
        return redirect("/login");
      }

      try {
        await projectService.changeWorkingStatus(id);
        return redirect("/me");
      } catch {
        return { success: false, message: "Failed to change working status" };
      }
      break;
    default:
      return redirect("/me");
  }
}
