import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/colors";
import Button from "./button";

interface PropType {
  buttonText: string;
  modalTitle?: string;
  children?: any;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function CutomModal(props: PropType) {
  return (
    <>
      <Button text={props.buttonText} onPress={() => props.setVisible(true)} />
      <Modal visible={props.visible}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            {props.modalTitle && (
              <Text style={styles.headerText}>{props.modalTitle}</Text>
            )}
            <Pressable onPress={() => props.setVisible(false)}>
              <AntDesign name="close" color={Colors.lightText} size={24} />
            </Pressable>
          </View>
          <View style={styles.content}>{props.children}</View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.appBackground,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
  },
});
