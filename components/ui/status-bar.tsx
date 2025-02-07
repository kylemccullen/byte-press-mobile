import { StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/colors";

interface StatusBarProps {
  percentComplete: number;
}

export default function CustomStatusBar(props: StatusBarProps) {
  const background = useThemeColor("background");

  return (
    <View style={{ ...styles.bar, backgroundColor: background }}>
      <View
        style={{
          ...styles.fill,
          width: `${props.percentComplete}%`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 16,
    borderRadius: 8,
    marginBottom: 6,
  },
  fill: {
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
});
