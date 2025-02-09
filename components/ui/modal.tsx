import { Modal, View, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BORDER_COLOR, CARD_BACKGROUND } from "@/constants/colors";
import Button from "./button";
import Wrapper from "./wrapper";
import { ThemedText } from "./themed-text";
import { cn } from "@/util/utils";
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
        <Wrapper className={cn("p-0", CARD_BACKGROUND)}>
          <View
            className={cn(
              "flex-row items-center justify-between p-3 border-b",
              BORDER_COLOR,
            )}
          >
            {props.modalTitle && (
              <ThemedText className="font-bold text-xl">
                {props.modalTitle}
              </ThemedText>
            )}
            <TouchableOpacity onPress={() => props.setVisible(false)}>
              <AntDesign name="close" color={lightText} size={24} />
            </TouchableOpacity>
          </View>
          <View className="p-3">{props.children}</View>
        </Wrapper>
      </Modal>
    </>
  );
}
