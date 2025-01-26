import { Colors } from "@/constants/colors";
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
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
      <Text style={styles.error}>{props.error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    color: Colors.lightText,
  },
  input: {
    borderColor: Colors.lightText,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  error: {
    paddingTop: 4,
    color: Colors.red,
  },
});
