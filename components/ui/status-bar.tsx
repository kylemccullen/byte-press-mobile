import { View } from "react-native";
import { Colors } from "@/lib/constants";
import { ThemedView } from "./themed-view";

interface StatusBarProps {
  percentComplete: number;
}

export default function CustomStatusBar(props: StatusBarProps) {
  const statusBarClasses = "h-[16px] rounded-lg mb-2";

  return (
    <ThemedView className={statusBarClasses}>
      <View
        className={statusBarClasses}
        style={{
          backgroundColor: Colors.primary,
          width: `${props.percentComplete}%`,
        }}
      />
    </ThemedView>
  );
}
