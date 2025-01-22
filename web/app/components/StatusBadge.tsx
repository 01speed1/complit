import { ReactNode } from "react";

import CompletedIcon from "~/icons/Completed";
import PendingIcon from "~/icons/Pending";
import WorkingIcon from "~/icons/Working";

import { status as taskStatus } from "../constants";

interface StatusBadgeProps {
  children: ReactNode;
  status: string;
  className?: string;
}

export function StatusBadge({
  children,
  status,
  className,
}: StatusBadgeProps): JSX.Element {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case taskStatus.Completed:
        return "bg-green-300 text-green-700";
      case taskStatus.Pending:
        return "bg-orange-300 text-orange-700";
      case taskStatus.Working:
        return "bg-yellow-300 text-yellow-700";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case taskStatus.Completed:
        return <CompletedIcon />;
      case taskStatus.Pending:
        return <PendingIcon />;
      case taskStatus.Working:
        return <WorkingIcon />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`${getStatusStyles(
        status
      )} text-sm font-semibold py-1 px-4 rounded-full flex items-center ${className}`}
    >
      <div className="mr-1">{getStatusIcon(status)}</div>
      {children}
    </button>
  );
}
