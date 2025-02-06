import { useThemeColor } from "@/hooks/useThemeColor";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function CustomTextInput(props: Props) {
  const lightText = useThemeColor("lightText");
  const error = useThemeColor("error");
  const color = useThemeColor("text");

  return (
    <View style={styles.container}>
      <Text style={{ color: lightText }}>{props.label}</Text>
      <TextInput
        style={{ ...styles.input, color, borderColor: lightText }}
        {...props}
      />
      <Text style={{ ...styles.error, color: error }}>{props.error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  error: {
    paddingTop: 4,
  },
});
