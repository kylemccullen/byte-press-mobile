import { View } from "react-native";
import { ThemedText } from "./themed-text";

interface Props {
  title: string;
}

export default function Header(props: Props) {
  return (
    <View className="mb-4">
      <ThemedText className="text-2xl font-bold">{props.title}</ThemedText>
    </View>
  );
}
