import {
  View,
  TextInput,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { cn } from "@/util/utils";
import { CARD_BACKGROUND, TEXT_COLOR } from "@/constants/colors";

interface SearchInputProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  placeholderText?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
}

export default function CustomSearchInput(props: SearchInputProps) {
  const lightText = useThemeColor("lightText"); // TODO - Use tailwind for color

  return (
    <View
      className={cn(
        "flex-row items-center gap-2 rounded-lg",
        CARD_BACKGROUND,
        props.className,
      )}
      style={{ paddingLeft: 8 }}
    >
      <FontAwesome name="search" color={lightText} />
      <TextInput
        className={cn("flex-1 py-2 m-0", TEXT_COLOR)}
        placeholder={props.placeholderText || "Search..."}
        placeholderTextColor={lightText}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      {props.value && (
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => props.onChangeText?.("")}
        >
          <FontAwesome name="close" color={lightText} />
        </TouchableOpacity>
      )}
    </View>
  );
}
