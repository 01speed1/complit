import ProjectsService, { Project } from "../services/projects";
import { Link, useLoaderData, redirect } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import UsersService from "~/services/users";
import ProjectCard from "./projects/ProjectCard";
import CardContainer from "~/components/CardContainer";

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
  } catch (error) {
    console.error(error);
    return redirect("/login");
  }

  const projects = await projectService.getProjects();
  const user = await userService.getUser();

  return { projects, userName: user.name };
};

const Me = () => {
  let { projects, userName } = useLoaderData<LoaderData>();

  // projects = []; // projects;

  const workingProject = projects.find((project) => project.isWorking);
  const otherProjects = projects.filter((project) => !project.isWorking);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="mx-auto w-[40rem]">
          <div className="text-md mb-4 font-lexend bg-orange-400 text-white rounded-lg px-6">
            Welcome
          </div>
          <CardContainer>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0">
                <img
                  src="https://avatar.iran.liara.run/public/35"
                  alt="User avatar"
                />
              </div>
              <div className="ml-4">
                <h2 className="font-lexend text-xl font-semibold">
                  {userName}
                </h2>
                <p className="text-gray-600">Logged in user</p>
              </div>
            </div>
          </CardContainer>
          <CardContainer>
            <div className="flex flex-col justify-around">
              <h2 className="text-2xl mb-4 mt-4 font-lexend">Your Projects</h2>
              <Link
                to="/projects/new"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
              >
                Add new Project
              </Link>
            </div>
          </CardContainer>

          {projects.length === 0 && (
            <CardContainer>
              <div className="text-xl mb-2 font-semibold font-lexend text-center">
                No projects found
              </div>
              <br />
              <div className="text-sm text-center font-montserrat">
                Click the button above to create a new project
              </div>
            </CardContainer>
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
        </div>
      </div>
    </>
  );
};

export default Me;
