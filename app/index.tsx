import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/colors";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getCompletedTaskCount } from "@/util/task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken } from "@/util/user";
import { AuthActionType, AuthContext } from "@/contexts/auth-context";
import { AuthToken } from "@/models/auth-token";
import { ThemedView } from "@/components/ui/themed-view";
import { ThemedText } from "@/components/ui/themed-text";

export default function Welcome() {
  const { authDispatch } = useContext(AuthContext);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        var value = await AsyncStorage.getItem("token");
        if (value) {
          refreshToken((JSON.parse(value) as AuthToken).refreshToken)
            .then((authToken: AuthToken) => {
              authDispatch?.({
                type: AuthActionType.LOGIN,
                payload: { authToken },
              });
              router.replace("/home");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {}
    })();

    getCompletedTaskCount()
      .then(setCount)
      .catch((error) => console.log(JSON.stringify(error, null, 2)));
  }, []);

  return (
    <ThemedView style={styles.wrapper}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
        transition={1000}
      />
      <ThemedText style={styles.welcome}>
        Welcome to a simple Todo App!
      </ThemedText>
      <ThemedText style={styles.count}>Over {count} tasks completed</ThemedText>
      <ThemedView style={styles.container}>
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
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
