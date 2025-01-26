import { User } from "./user";

export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  user: User;
}

export interface AddTask {
  name: string;
}

export interface UpdateTask {
  isCompleted: boolean;
}
