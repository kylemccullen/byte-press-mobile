import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Href, Link } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props {
  href: Href;
  text: string;
}

export default function CustomLink(props: Props) {
  const linkColor = useThemeColor("linkColor");

  return (
    <Link href={props.href} asChild replace>
      <TouchableOpacity>
        <Text style={{ ...styles.linkText, color: linkColor }}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  linkText: {
    textDecorationLine: "underline",
    padding: 3,
  },
});
