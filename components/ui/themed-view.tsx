import { View, type ViewProps } from "react-native";
import { BACKGROUND_COLOR } from "../../lib/constants";
import { cn } from "@/lib/utils";

export function ThemedView(props: ViewProps) {
  return <View {...props} className={cn(BACKGROUND_COLOR, props.className)} />;
}
