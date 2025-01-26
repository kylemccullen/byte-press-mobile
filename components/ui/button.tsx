import { Colors } from "@/constants/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface Props extends TouchableOpacityProps {
  text: string;
  loading?: boolean;
  icon?: React.ComponentProps<typeof FontAwesome5>["name"];
}

export default function CustomButton(props: Props) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.primary, "#FFAA00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {props.icon && (
          <FontAwesome5 name={props.icon} color="white" size={20} />
        )}
        {!props.loading && <Text style={styles.text}>{props.text}</Text>}
        {props.loading && <ActivityIndicator color="white" />}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
