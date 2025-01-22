import { Link, Form, useLoaderData, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import TaskService from "~/services/tasks";

import type { LoaderFunction, ActionFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const project_id = url.searchParams.get("project_id");

  const taskService = new TaskService(request);

  try {
    await taskService.init();
  } catch {
    return redirect("/login");
  }

  return { project_id };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const project_id = formData.get("project_id");

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof project_id !== "string"
  ) {
    return { error: "Invalid form data" };
  }

  const taskService = new TaskService(request);

  try {
    await taskService.init();
    await taskService.createTask({
      title,
      description,
      project_id: +project_id,
    });
    return redirect(`/projects/${project_id}`);
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export default function TaskNew() {
  const { project_id } = useLoaderData<{ project_id: string }>();
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="border-gray-200 bg-white px-4 py-3 sm:px-6 mb-4 rounded-md shadow-md">
      <h1 className="text-2xl m-4 text-center">Create a new Task</h1>
      <Form className="flex flex-col" method="post">
        <input type="hidden" name="project_id" value={project_id} />
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
        {actionData?.error && (
          <p className="text-red-500">{actionData.error}</p>
        )}
        <div className="flex flex-col mt-4 w-full">
          <Link
            to={`/projects/${project_id}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 mb-4 text-center"
          >
            <button type="button">Back to project</button>
          </Link>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Create Task
          </button>
        </div>
      </Form>
    </div>
  );
}
