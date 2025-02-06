import { Modal, View, Pressable, StyleSheet } from "react-native";
import { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/colors";
import Button from "./button";
import Wrapper from "./wrapper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./themed-text";

interface PropType {
  buttonText: string;
  modalTitle?: string;
  children?: any;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function CutomModal(props: PropType) {
  const cardBackground = useThemeColor("cardBackground");
  const background = useThemeColor("background");

  return (
    <>
      <Button text={props.buttonText} onPress={() => props.setVisible(true)} />
      <Modal visible={props.visible}>
        <Wrapper style={{ backgroundColor: cardBackground, padding: 0 }}>
          <View style={{ ...styles.header, borderBottomColor: background }}>
            {props.modalTitle && (
              <ThemedText style={styles.headerText}>
                {props.modalTitle}
              </ThemedText>
            )}
            <Pressable onPress={() => props.setVisible(false)}>
              <AntDesign name="close" color={Colors.lightText} size={24} />
            </Pressable>
          </View>
          <View style={styles.content}>{props.children}</View>
        </Wrapper>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
