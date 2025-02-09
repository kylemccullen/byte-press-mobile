import { TEXT_COLOR } from "@/constants/colors";
import { cn } from "@/util/utils";
import { Text, type TextProps } from "react-native";

export function ThemedText(props: TextProps) {
  return <Text {...props} className={cn(props.className, TEXT_COLOR)} />;
}
