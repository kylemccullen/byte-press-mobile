import { LIGHT_TEXT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TextInput, View, Text, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function CustomTextInput(props: Props) {
  return (
    <View className="mb-2">
      <Text className={LIGHT_TEXT}>{props.label}</Text>
      <TextInput
        {...props}
        className={cn(
          "border-b py-2",
          LIGHT_TEXT,
          "border-gray-500 dark:border-gray-400",
        )}
      />
      <Text className="pt-1 text-red-500">{props.error}</Text>
    </View>
  );
}
