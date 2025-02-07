import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface SearchInputProps {
  style?: StyleProp<ViewStyle>;
  placeholderText?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
}

export default function CustomSearchInput(props: SearchInputProps) {
  const lightText = useThemeColor("lightText");
  const cardBackground = useThemeColor("cardBackground");
  const text = useThemeColor("text");

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cardBackground },
        props.style,
      ]}
    >
      <FontAwesome name="search" color={lightText} />
      <TextInput
        style={{ flex: 1, color: text, fontSize: 14 }}
        placeholder={props.placeholderText || "Search..."}
        placeholderTextColor={lightText}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      {props.value && (
        <TouchableOpacity
          style={{ padding: 3 }}
          onPress={() => props.onChangeText?.("")}
        >
          <FontAwesome name="close" color={lightText} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: Platform.OS == "ios" ? 8 : 3,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
