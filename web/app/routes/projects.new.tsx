import { Link, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import ProjectService, { NewProject } from "../services/projects";

export const loader = async () => {
  return { project: {} };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const now = Date.now();

  const newProject: NewProject = { title, description, start_date: now };

  const projectService = new ProjectService(request);

  try {
    await projectService.init();

    await projectService.createProject(newProject);

    return redirect("/me");
  } catch (error) {
    console.error("Failed to create project:", error);
    return { error: "Failed to create project. Please try again." };
  }
};

export default function ProjectNew() {
  return (
    <div className="border-gray-200 bg-white px-4 py-3 sm:px-6 mb-4 rounded-md shadow-md">
      <h1 className="text-2xl m-4 text-center">Create a new Project</h1>
      <Form className="flex flex-col" method="post">
        <label htmlFor="title" className="text-md">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="border border-gray-300 rounded-md p-2 mb-4"
          required
        />
        <label htmlFor="description" className="text-md">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border border-gray-300 rounded-md p-2 mb-4"
          required
        />
        <div className=" flex flex-col m-4">
          <Link
            to="/me"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 mb-4 text-center"
          >
            <button type="button">Back to Me</button>
          </Link>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Create Project
          </button>
        </div>
      </Form>
    </div>
  );
}
