import axios from "axios";
import { environment } from "@/environments/environment";
import { AddTask, Task, UpdateTask } from "@/models/task";

export const getTasks = async (): Promise<Task[]> => {
  var result = await axios.get(`${environment.apiUrl}/api/tasks`);

  return result.data as Task[];
};

export const addTask = async (name: string): Promise<Task> => {
  const addTask: AddTask = { name };

  var result = await axios.post(`${environment.apiUrl}/api/tasks`, addTask);

  return result.data as Task;
};

export const updateTask = async (
  id: number,
  updateTask: UpdateTask,
): Promise<Task> => {
  var result = await axios.put(
    `${environment.apiUrl}/api/tasks/${id}`,
    updateTask,
  );

  return result.data as Task;
};

export const getCompletedTaskCount = async (): Promise<number> => {
  var result = await axios.get(
    `${environment.apiUrl}/api/tasks/completed/count`,
  );

  return result.data as number;
};
