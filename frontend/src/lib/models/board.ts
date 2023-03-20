export interface MemberSchema {
  userId: string;
  permission?: string;
  role?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    username: string;
  };
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
export type CreateTask = Omit<BoardTask, '_id'> & {
  members: Omit<MemberSchema, 'user'>[];
};
export type UpdateTask = Partial<Omit<CreateTask, 'createdAt'>>;
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

export type Board = BoardCredentials;


// export types for use in other files
export type CreateBoard = Omit<Board, '_id' | 'createdAt'>;
export type UpdateBoard = Partial<Omit<CreateBoard, 'createdAt'>>;


