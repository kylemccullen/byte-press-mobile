import { cn } from "@/lib/utils";
import { SafeAreaView, View, ViewProps } from "react-native";

export default function Wrapper(props: ViewProps) {
  return (
    <SafeAreaView className="flex-1 bg-gray-200 dark:bg-gray-800">
      <View {...props} className={cn("flex-1 p-5", props.className)}>
        {props.children}
      </View>
    </SafeAreaView>
  );
}
