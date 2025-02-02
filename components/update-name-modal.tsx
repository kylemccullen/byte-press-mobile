import { View, Alert } from "react-native";
import Modal from "./ui/modal";
import TextInput from "./ui/text-input";
import Button from "./ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { updateUser } from "@/util/user";

export default function UpdateNameModal() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const submit = () => {
    setLoading(true);

    updateUser(user?.id!, { name })
      .then((updateUser) => {
          console.log(updateUser);
        setUser?.(updateUser);
        setModalVisible(false);
      })
      .catch(() => Alert.alert("Oops", "An error occured."))
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      buttonText="Edit"
      modalTitle="Update Name"
      visible={modalVisible}
      setVisible={setModalVisible}
    >
      <View>
        <TextInput label="Name" multiline value={name} onChangeText={setName} />
        <Button text="Submit" onPress={submit} loading={loading} />
      </View>
    </Modal>
  );
}
