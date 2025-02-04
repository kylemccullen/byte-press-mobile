import { Task } from "@/models/task";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface TaskContextType {
  tasks?: Task[];
  setTasks?: Dispatch<SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextType>({});

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
