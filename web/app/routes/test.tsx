import { StatusBadge } from "~/components/StatusBadge";
import BookmarkStartIcon from "~/icons/BookMarkStart";
import CheckIcon from "~/icons/Check";
import CalendarIcon from "~/icons/Calendar";

interface ProjectStatusProps {
  project?: {
    name: string;
    status: string;
    lastCompletedTaskDays: number;
    lastTaskAddedDays: number;
    createdAtDays: number;
    taskCompletedCount: number;
    taskCount: number;
    isWorking: boolean;
    workingDays: number;
  };
}

const ProjectStatus = ({ project }: ProjectStatusProps) => {
  project = {
    name: "A Super duper project",
    status: "Working",
    lastCompletedTaskDays: 10,
    lastTaskAddedDays: 5,
    createdAtDays: 200,
    taskCompletedCount: 9,
    taskCount: 10,
    isWorking: true,
    workingDays: 15,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="text-2xl">{project.name}</div>
      <StatusBadge className="pt-2" status={project.status}>
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
            90%
          </div>
          <div className="text-md font-bold">
            {project.taskCompletedCount}/{project.taskCount} tasks
          </div>
        </div>
      </div>
      {project.isWorking && (
        <div className="mt-4 projectCard__InProgessStatus text-orange-700 text-center items-center rounded-lg bg-orange-300 p-2">
          <CheckIcon className="text-xl" />
          <span className="text-sm ml-2">
            You are working {project.workingDays} days on this
          </span>
        </div>
      )}
      <div className="projectCard__buttons mt-4">
        <button className="w-full bg-green-100 border border-green-500 text-green-600 font-semibold rounded-lg py-2 hover:bg-green-200">
          I will do it!
        </button>
      </div>
    </div>
  );
};

export default function Test() {
  return (
    <div className="space-y-4">
      <ProjectStatus></ProjectStatus>

      {/* <StatusBadge status={taskStatus.Pending}>Pending Task</StatusBadge>
      <StatusBadge status={taskStatus.Working}>Working Task</StatusBadge>
      <StatusBadge status={taskStatus.Completed}>Completed Task</StatusBadge> */}
    </div>
  );
}
