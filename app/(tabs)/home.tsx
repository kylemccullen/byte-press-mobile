import Card from "@/components/ui/card";
import { Task } from "@/models/task";
import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, RefreshControl } from "react-native";
import { Colors, LIGHT_TEXT } from "@/lib/constants";
import { Checkbox } from "expo-checkbox";
import Button from "@/components/ui/button";
import { getTasks, updateTask } from "@/services/task";
import { AuthContext } from "@/contexts/auth-context";
import AddTaskModal from "@/components/add-task-modal";
import { TaskContext } from "@/contexts/task-context";
import { ThemedText } from "@/components/ui/themed-text";
import Wrapper from "@/components/ui/wrapper";
import { cn } from "@/lib/utils";

export default function Home() {
  const { authState } = useContext(AuthContext);
  const { user } = authState!;
  const { tasks, setTasks } = useContext(TaskContext);
  const [showCompleted, setShowCompleted] = useState(false);
  const [filteredTasks, setFilterdTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  var loadTasks = () => {
    getTasks?.().then((tasks: Task[]) => {
      setTasks?.(tasks);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      loadTasks();
    }, 100); // TODO - Fix race condition
  }, []);

  useEffect(() => {
    const newFilteredTasks = showCompleted
      ? tasks
      : tasks?.filter((task: Task) => !task.isCompleted);
    if (newFilteredTasks) setFilterdTasks(newFilteredTasks);
  }, [tasks, showCompleted]);

  var toggleTask = (task: Task) => {
    updateTask(task.id, { isCompleted: !task.isCompleted })
      .then((updatedTask) =>
        setTasks?.((prevTasks: Task[]) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          ),
        ),
      )
      .catch(() => Alert.alert("Oops", "An error occured."));
  };

  return (
    <Wrapper>
      <View className="py-3">
        <ThemedText className="text-2xl text-right">
          {"Welcome, "}
          <ThemedText className="font-bold">
            {user?.name ?? user?.email}
          </ThemedText>
          !
        </ThemedText>
      </View>
      <View className="flex-row items-center justify-between pb-5">
        <Text className={cn(LIGHT_TEXT)}>
          Showing {filteredTasks.length} of {tasks?.length} tasks
        </Text>
        <Button
          icon={showCompleted ? "eye-slash" : "eye"}
          text={showCompleted ? "Hide Completed" : "Show Completed"}
          onPress={() => setShowCompleted(!showCompleted)}
        />
      </View>

      {filteredTasks.length === 0 && (
        <Text className={cn(LIGHT_TEXT, "text-center")}>No tasks to show.</Text>
      )}
      <ScrollView
        className="flex-1 mb-2"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadTasks} />
        }
      >
        <View className="flex-1 gap-2">
          {filteredTasks?.map((task: Task) => (
            <Card
              key={task.id}
              className="flex-row items-center gap-3 pr-[40px]" // TODO - make long text fit without padding adjustment
            >
              <Checkbox
                value={task.isCompleted}
                color={Colors.primary}
                onValueChange={() => toggleTask(task)}
              />
              <ThemedText>{task.name}</ThemedText>
            </Card>
          ))}
        </View>
      </ScrollView>
      <AddTaskModal />
    </Wrapper>
  );
}
