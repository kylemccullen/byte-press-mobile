import { CARD_BACKGROUND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { View, ViewProps } from "react-native";

export default function Card(props: ViewProps) {
  return (
    <View
      className={cn(
        "w-full p-[20px] rounded-lg",
        CARD_BACKGROUND,
        props.className,
        "bg-white dark:bg-gray-700",
      )}
    >
      {props.children}
    </View>
  );
}
