import ProjectsService, { Project } from "../services/projects";
import { Link, useLoaderData, redirect } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import UsersService from "~/services/users";
import ProjectCard from "./projects/ProjectCard";

interface LoaderData {
  projects: Project[];
  token: string;
  userName: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const userService = new UsersService(request);
  const projectService = new ProjectsService(request);
  try {
    await projectService.init();
    await userService.init();
  } catch {
    return redirect("/login");
  }

  const projects = await projectService.getProjects();
  const user = await userService.getUser();

  return { projects, userName: user.name };
};

const Me = () => {
  const { projects, userName } = useLoaderData<LoaderData>();

  const workingProject = projects.find((project) => project.isWorking);
  const otherProjects = projects.filter((project) => !project.isWorking);

  return (
    <>
      <div className="border-gray-200 bg-white px-4 py-3 sm:px-6 mb-4 rounded-md shadow-md">
        <h1 className="text-2xl m-4 text-center">Welcome, {userName}!</h1>

        <div className="flex flex-col justify-around">
          <h2 className="text-2xl mb-4 mt-4">Your Projects</h2>
          <Link
            to="/projects/new"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
          >
            Add new Project
          </Link>
        </div>
      </div>

      {projects.length === 0 && (
        <div className="">
          <div className="text-l mb-2 font-semibold text-center">
            No projects found
          </div>
          <br />
          <div className="text-sm text-center">
            Click the button above to create a new project
          </div>
        </div>
      )}

      {workingProject && (
        <>
          <h2 className="text-2xl mb-4 mt-10">Working Project</h2>
          <ProjectCard project={workingProject} />
        </>
      )}

      {otherProjects.length > 0 && (
        <>
          <h2 className="text-2xl mb-4 mt-10">Other Projects</h2>
          {otherProjects.map((project) => (
            <>
              <ProjectCard project={project} />
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Me;
