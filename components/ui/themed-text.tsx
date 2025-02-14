import { cn } from "@/lib/utils";
import { Text, type TextProps } from "react-native";

interface Props extends TextProps {
  light?: boolean;
}

export function ThemedText(props: Props) {
  return (
    <Text
      {...props}
      className={cn(
        props.className,
        !props.light
          ? "text-black dark:text-white"
          : "text-gray-500 dark:text-gray-400",
      )}
    />
  );
}
