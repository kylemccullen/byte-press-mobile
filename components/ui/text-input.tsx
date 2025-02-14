import { TextInput, View, Text, TextInputProps } from "react-native";
import { ThemedText } from "./themed-text";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function CustomTextInput(props: Props) {
  return (
    <View className="mb-2">
      <ThemedText light>{props.label}</ThemedText>
      <TextInput
        {...props}
        className="border-b py-2 text-black dark:text-white border-gray-500 dark:border-gray-400"
      />
      <Text className="pt-1 text-red-500">{props.error}</Text>
    </View>
  );
}
