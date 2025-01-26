import { Text, TouchableOpacity } from "react-native";
import { Href, Link } from "expo-router";
import { Colors } from "@/constants/colors";

interface Props {
  href: Href;
  text: string;
}

export default function CustomLink(props: Props) {
  return (
    <Link href={props.href} asChild replace>
      <TouchableOpacity>
        <Text style={{ color: Colors.link, textDecorationLine: "underline" }}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
