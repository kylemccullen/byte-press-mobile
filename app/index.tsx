import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/colors";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getCompletedTaskCount } from "@/util/task";

export default function Welcome() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getCompletedTaskCount()
      .then(setCount)
      .catch((error) => console.log(JSON.stringify(error, null, 2)));
  }, []);

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
        transition={1000}
      />
      <Text style={styles.welcome}>Welcome to a simple Todo App!</Text>
      <Text style={styles.count}>Over {count} tasks completed</Text>
      <View style={styles.container}>
        <Button
          style={styles.button}
          text="Login"
          onPress={() => router.push("/(auth)/login")}
        />
        <Button
          style={styles.button}
          text="Register"
          onPress={() => router.push("/(auth)/register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60%",
    aspectRatio: 3,
  },
  welcome: {
    fontSize: 24,
  },
  count: {
    marginBottom: 15,
  },
  container: {
    flexDirection: "row",
    gap: 20,
    width: "90%",
    maxWidth: 300,
  },
  button: {
    flex: 1,
  },
});
