import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView, StyleProp, View, ViewStyle } from "react-native";

interface WrapperProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default function Wrapper(props: WrapperProps) {
  const backgroundColor = useThemeColor("background");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={[{ flex: 1, padding: 20 }, props.style]}>
        {props.children}
      </View>
    </SafeAreaView>
  );
}
