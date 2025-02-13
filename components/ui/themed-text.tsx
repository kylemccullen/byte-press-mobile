import { TEXT_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Text, type TextProps } from "react-native";

export function ThemedText(props: TextProps) {
  return <Text {...props} className={cn(props.className, TEXT_COLOR)} />;
}
