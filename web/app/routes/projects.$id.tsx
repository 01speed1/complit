import { redirect, LoaderFunctionArgs, ActionFunction } from "@remix-run/node";
import {
  FetcherWithComponents,
  Link,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import ProjectsService from "~/services/projects";
import TasksService, { Task, TaskStatus } from "~/services/tasks";
import { useEffect, useState } from "react";
import DeleteIcon from "~/icons/Delete";
import { StatusBadge } from "~/components/StatusBadge";

/**Loader */
export async function loader({ params: { id }, request }: LoaderFunctionArgs) {
  const projectService = new ProjectsService(request);
  const tasksService = new TasksService(request);
  try {
    await projectService.init();
    await tasksService.init();
  } catch (error) {
    return redirect("/login");
  }

  const project = await projectService.getProjectById(id as string);
  const tasks = await tasksService.getTaskByProjectId(project.id);

  return { project, tasks };
}

type ActionResponse = {
  success: boolean;
  message: string;
  task?: Task;
};

function TaskCard({ taskParam }: { taskParam: Task }) {
  const [task, setTask] = useState<Task>(taskParam);
  const fetcher: FetcherWithComponents<ActionResponse> = useFetcher();
  const deleteFetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.data.success && fetcher.data.task) {
      setTask(fetcher.data.task);
    }
  }, [fetcher]);

  const onClickToChangeTaskStatus = async (id: number, status: TaskStatus) => {
    const statusMap = {
      Pending: "Working",
      Working: "Completed",
      Completed: "Pending",
    };

    const payload = { id, status: statusMap[status] };

    await fetcher.submit(payload, { method: "PATCH" });
  };

  const onClickToDeleteTask = async (id: number) => {
    await deleteFetcher.submit({ id }, { method: "DELETE" });
  };

  return (
    <div className="task  border-gray-200 bg-white px-4 py-3 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-300 mt-4">
      <div
        className="flex flex-col"
        role="button"
        tabIndex={0}
        onClick={() => onClickToChangeTaskStatus(task.id, task.status)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClickToChangeTaskStatus(task.id, task.status);
          }
        }}
      >
        <div className="task__title text-lg font-bold">{task.title}</div>
        <div className="task__content inline-flex items-center justify-between">
          <span className="task__description max-w-[80%]">
            {task.description}
          </span>
          <StatusBadge status={task.status}>{task.status}</StatusBadge>
        </div>
      </div>
      <div className="task__buttons mt-10">
        <button
          onClick={() => onClickToDeleteTask(task.id)}
          className=" flex justify-between buttons__deleteButton text-center w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          <span>Delete</span>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default function ProjectsIdRoute() {
  const { project, tasks } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-md shadow-md">
        <div className="flex flex-col">
          <h1 className="text-xl mb-2 font-semibold">{project.title}</h1>
          <p className="mt-4 flex justify-between">{project.description}</p>
          <Link to={`/tasks/new?project_id=${project.id}`}>
            <div className="actionButtons mt-4">
              <div className="actionButton bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">
                <button className="actionButton_addTask ">Add Task</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Link to={"/me"}>
        <div className="actionButtons mt-4">
          <div className="actionButton bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
            <button className="actionButton_addTask ">Return to me</button>
          </div>
        </div>
      </Link>

      <div className="tasks">
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} taskParam={task} />
        ))}
      </div>
    </>
  );
}

/** ACTION */
export const action: ActionFunction = async ({ request }) => {
  const actionPath = async ({ request }: { request: Request }) => {
    const payload = await request.formData();
    const id = payload.get("id") as string;

    if (!id) {
      return { success: false, message: "Task id is required" };
    }

    const status = payload.get("status");

    const taskService = new TasksService(request);

    try {
      await taskService.init();

      const updatedTask = await taskService.updateTaskStatus(
        id,
        status as TaskStatus
      );
      return { success: true, task: updatedTask, message: "Task updated" };
    } catch {
      return { success: false, message: "Error updating task status" };
    }
  };

  const actionDelete = async ({ request }: { request: Request }) => {
    const payload = await request.formData();
    const id = payload.get("id") as string;

    if (!id) {
      return { success: false, message: "Task id is required" };
    }

    const taskService = new TasksService(request);

    try {
      await taskService.init();
      await taskService.deleteTask(id);
      return { success: true, message: "Task deleted" };
    } catch {
      return { success: false, message: "Error deleting task" };
    }
  };

  switch (request.method) {
    case "PATCH":
      return actionPath({ request });

    case "DELETE":
      return actionDelete({ request });
    default:
      return { status: 405, message: "Method Not Allowed" };
  }
};
