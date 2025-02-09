import { Text, TouchableOpacity } from "react-native";
import { Href, Link } from "expo-router";

interface Props {
  href: Href;
  text: string;
}

export default function CustomLink(props: Props) {
  return (
    <Link href={props.href} asChild replace>
      <TouchableOpacity>
        <Text className="underline p-1 text-blue-500">{props.text}</Text>
      </TouchableOpacity>
    </Link>
  );
}
