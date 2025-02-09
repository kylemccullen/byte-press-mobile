import { View } from "react-native";
import { BACKGROUND_COLOR, Colors } from "@/constants/colors";
import { cn } from "@/util/utils";

interface StatusBarProps {
  percentComplete: number;
}

export default function CustomStatusBar(props: StatusBarProps) {
  const statusBarClasses = "h-[16px] rounded-lg mb-2";

  return (
    <View className={cn(BACKGROUND_COLOR, statusBarClasses)}>
      <View
        className={statusBarClasses}
        style={{
          backgroundColor: Colors.primary,
          width: `${props.percentComplete}%`,
        }}
      />
    </View>
  );
}
