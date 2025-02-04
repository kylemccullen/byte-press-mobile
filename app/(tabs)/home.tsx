import Card from "@/components/ui/card";
import { Task } from "@/models/task";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Checkbox } from "expo-checkbox";
import Button from "@/components/ui/button";
import { getTasks, updateTask } from "@/util/task";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "@/contexts/auth-context";
import AddTaskModal from "@/components/add-task-modal";
import { TaskContext } from "@/contexts/task-context";

export default function Home() {
  const { authState } = useContext(AuthContext);
  const { user } = authState!;
  const { tasks, setTasks } = useContext(TaskContext);
  const [showCompleted, setShowCompleted] = useState(false);
  const [filteredTasks, setFilterdTasks] = useState<Task[]>([]);

  var loadTasks = () => {
    getTasks?.().then(setTasks);
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
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome,{" "}
          <Text style={{ fontWeight: "bold" }}>
            {user?.name ?? user?.email}
          </Text>
          !
        </Text>
      </View>
      <View style={styles.filtersContainer}>
        <Text style={styles.filterText}>
          Showing {filteredTasks.length} of {tasks?.length} tasks
        </Text>
        <Button
          icon={showCompleted ? "eye-slash" : "eye"}
          text={showCompleted ? "Hide Completed" : "Show Completed"}
          onPress={() => setShowCompleted(!showCompleted)}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {filteredTasks?.map((task: Task) => (
            <Card key={task.id} style={styles.task}>
              <Checkbox
                value={task.isCompleted}
                color={Colors.primary}
                onValueChange={() => toggleTask(task)}
              />
              <Text>{task.name}</Text>
            </Card>
          ))}
        </View>
        <TouchableOpacity onPress={loadTasks} style={styles.refreshContainer}>
          <FontAwesome name="refresh" color={Colors.lightText} />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </ScrollView>
      <AddTaskModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    padding: 20,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    textAlign: "right",
  },
  scrollView: {
    flex: 1,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    gap: 5,
  },
  task: {
    paddingVertical: 10,
    paddingRight: 40, // TODO - make long text fit without padding adjustment
    flexDirection: "row",
    gap: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  filterText: {
    color: Colors.lightText,
  },
  refreshContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  refreshText: {
    color: Colors.lightText,
  },
});
