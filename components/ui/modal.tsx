import {
  Modal,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "./button";
import Wrapper from "./wrapper";
import { ThemedText } from "./themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";

interface PropType {
  buttonText: string;
  modalTitle?: string;
  children?: any;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function CutomModal(props: PropType) {
  const lightText = useThemeColor("lightText");

  return (
    <>
      <Button text={props.buttonText} onPress={() => props.setVisible(true)} />
      <Modal visible={props.visible}>
        <Wrapper className="p-0 bg-white dark:bg-gray-700">
          <View className="flex-row items-center justify-between p-3 border-b border-gray-300 dark:border-gray-800">
            {props.modalTitle && (
              <ThemedText className="font-bold text-xl">
                {props.modalTitle}
              </ThemedText>
            )}
            <TouchableOpacity onPress={() => props.setVisible(false)}>
              <AntDesign name="close" color={lightText} size={24} />
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 p-3">{props.children}</View>
          </TouchableWithoutFeedback>
        </Wrapper>
      </Modal>
    </>
  );
}
