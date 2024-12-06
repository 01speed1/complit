export const ProjectStatus = {
  PENDING: 'Pending',
  WORKING: 'Working',
  COMPLETED: 'Completed',
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
