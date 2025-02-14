import { cn } from "@/lib/utils";
import { View, ViewProps } from "react-native";

export default function Card(props: ViewProps) {
  return (
    <View
      className={cn(
        "w-full p-[20px] rounded-lg bg-white dark:bg-gray-700",
        props.className,
      )}
    >
      {props.children}
    </View>
  );
}
