import { StatusBadge } from "~/components/StatusBadge";
import BookmarkStartIcon from "~/icons/BookMarkStart";
import CheckIcon from "~/icons/Check";
import CalendarIcon from "~/icons/Calendar";
import { Project } from "~/services/projects";
import { Form, Link } from "@remix-run/react";
import FlagIcon from "~/icons/Flag";

export interface ProjectStatusProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectStatusProps) {
  return (
    <div
      key={project.id}
      className="bg-white shadow-md rounded-lg p-6 mb-3 hover:bg-gray-100 transition-colors duration-200"
    >
      <Link to={`/projects/${project.id}`}>
        <div className="text-2xl">{project.title}</div>
        <StatusBadge className="pt-2 mt-2 text-sm" status={project.status}>
          {project.status}
        </StatusBadge>
        <div className="projectCard__content flex mt-4">
          <div className="projectCardContent__details mt-3 mb-3 w-[65%]">
            <ul className="space-y-2">
              <li className="flex items-center rounded-lg bg-gray-50 p-2">
                <CheckIcon className="text-gray-400" />
                <span className="text-sm ml-2">
                  {project.lastCompletedTaskDays} days since task completed
                </span>
              </li>
              <li className="flex items-center rounded-lg bg-gray-50 p-2">
                <BookmarkStartIcon className="text-gray-400" />
                <span className="text-sm ml-2">
                  {project.lastTaskAddedDays} days since last task added
                </span>
              </li>
              <li className="flex items-center rounded-lg bg-gray-50 p-2">
                <CalendarIcon className="text-gray-400" />
                <span className="text-sm ml-2">
                  Created {project.createdAtDays} days ago
                </span>
              </li>
            </ul>
          </div>
          <div className="projectCardContent__percentage flex flex-col items-center justify-evenly m-auto w-[35%]">
            <div className="percentageValue w-28 h-28 text-4xl border-4 border-green-500 rounded-full flex items-center justify-center">
              {project.completedTaskPercentage}%
            </div>
            <div className="text-md font-bold">
              {project.taskCompletedCount}/{project.taskCount} tasks
            </div>
          </div>
        </div>
      </Link>
      {project.isWorking && (
        <div className="mt-4 projectCard__InProgressStatus text-orange-700 text-center items-center rounded-lg bg-orange-300 p-2">
          <FlagIcon className="text-xl" />
          <span className="text-sm ml-2">
            You are working {project.workingDays || "0"} days sinse you check
          </span>
        </div>
      )}
      <div className="projectCard__buttons mt-4">
        {!project.isWorking && (
          <Form action={`/projects/${project.id}/change-working`} method="POST">
            <button
              type="submit"
              className="w-full bg-green-100 border border-green-500 text-green-600 font-semibold rounded-lg py-2 hover:bg-green-200"
            >
              I will do it!
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
