import { View, Alert } from "react-native";
import Modal from "./ui/modal";
import TextInput from "./ui/text-input";
import Button from "./ui/button";
import { useContext, useState } from "react";
import { addTask } from "@/util/task";
import { Task } from "@/models/task";
import { TaskContext } from "@/contexts/task-context";

interface FormErrors {
  name?: string;
}

export default function AddTaskModal() {
  const [name, setName] = useState("");
  const { setTasks } = useContext(TaskContext);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    const formErrors: FormErrors = {};

    if (!name) formErrors.name = "Name is required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const submit = () => {
    if (!validateForm()) return;

    setLoading(true);

    addTask(name)
      .then((newTask) => {
        setTasks?.((prevTasks: Task[]) => [...prevTasks, newTask]);
        setName("");
        setModalVisible(false);
      })
      .catch(() => Alert.alert("Oops", "An error occured."))
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      buttonText="Add Task"
      modalTitle="Add Task"
      visible={modalVisible}
      setVisible={setModalVisible}
    >
      <View>
        <TextInput
          label="Name"
          multiline
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <Button text="Submit" onPress={submit} loading={loading} />
      </View>
    </Modal>
  );
}
