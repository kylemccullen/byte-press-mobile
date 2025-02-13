import { BACKGROUND_COLOR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SafeAreaView, View, ViewProps } from "react-native";

export default function Wrapper(props: ViewProps) {
  return (
    <SafeAreaView className={cn("flex-1", BACKGROUND_COLOR)}>
      <View {...props} className={cn("flex-1 p-5", props.className)}>
        {props.children}
      </View>
    </SafeAreaView>
  );
}
