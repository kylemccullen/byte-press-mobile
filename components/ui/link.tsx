import { Text, TouchableOpacity } from "react-native";
import { Link, LinkProps } from "expo-router";

interface Props extends LinkProps {
  text: string;
}

export default function CustomLink(props: Props) {
  return (
    <Link asChild replace {...props}>
      <TouchableOpacity>
        <Text className="underline p-1 text-blue-500">{props.text}</Text>
      </TouchableOpacity>
    </Link>
  );
}
