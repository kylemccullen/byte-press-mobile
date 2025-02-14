import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export function ThemedView(props: ViewProps) {
  return (
    <View
      {...props}
      className={cn("bg-gray-200 dark:bg-gray-800", props.className)}
    />
  );
}
