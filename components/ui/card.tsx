import { StyleSheet, View, ViewProps } from "react-native";

export default function Card(props: ViewProps) {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
