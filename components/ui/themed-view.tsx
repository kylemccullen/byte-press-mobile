import { View, type ViewProps } from "react-native";
import { Colors } from "../../constants/colors";
import { useThemeColor } from "../../hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  backgroundColorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedView({
  style,
  backgroundColorName,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(backgroundColorName ?? "background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
