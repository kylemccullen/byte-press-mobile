import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Card(props: ViewProps) {
  const backgroundColor = useThemeColor("cardBackground");

  return (
    <View style={[styles.card, props.style, { backgroundColor }]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
