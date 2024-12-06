export const TaskStatus = {
  PENDING: 'Pending',
  WORKING: 'Working',
  COMPLETED: 'Completed',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
