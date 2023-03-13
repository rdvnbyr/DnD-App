export interface MemberSchema {
  userId: string;
  permission?: string;
  role?: string;
}

export type TaskActivity = {
  _id: string;
  createdAt: string;
  attachments?: string[];
  comment: string;
  userId: string;
};
export interface Task {
  _id: string;
  name: string;
  description?: string;
  activities: TaskActivity[];
  labels?: string[];
  attachments?: string[];
  members: MemberSchema[];
  createdAt?: string;
}
export type BoardTask = Task;
export interface BoardList {
  _id: string;
  name: string;
  tasks: Task[];
  members: MemberSchema[] | [];
  createdAt?: string | Date;
}
export interface BoardCredentials {
  _id: string;
  name: string;
  description?: string;
  lists: BoardList[];
  members: MemberSchema[];
  workspaceId: string;
  owner: string;
  createdAt?: string;
}

export interface Board extends BoardCredentials {
  // extra fields here
}
