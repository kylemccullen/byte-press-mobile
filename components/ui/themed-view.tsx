import { View, type ViewProps } from "react-native";
import { BACKGROUND_COLOR } from "../../constants/colors";
import { cn } from "@/util/utils";

export function ThemedView(props: ViewProps) {
  return <View {...props} className={cn(BACKGROUND_COLOR, props.className)} />;
}
