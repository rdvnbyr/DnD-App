import { Board } from './board';

export interface Workspace {
  boards: Board[];
  _id: string;
  name: string;
  description?: string;
  owner: string;
  createdAt?: string;
}
