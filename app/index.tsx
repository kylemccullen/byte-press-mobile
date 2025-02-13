import { View } from "react-native";
import { Image } from "expo-image";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getCompletedTaskCount } from "@/services/task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken } from "@/services/user";
import { AuthActionType, AuthContext } from "@/contexts/auth-context";
import { AuthToken } from "@/models/auth-token";
import { ThemedText } from "@/components/ui/themed-text";
import Wrapper from "@/components/ui/wrapper";

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
    <Wrapper className="items-center justify-center">
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: "60%", aspectRatio: 3 }}
        contentFit="contain"
        transition={1000}
      />
      <ThemedText className="text-2xl">
        Welcome to a simple Todo App!
      </ThemedText>
      <ThemedText className="mb-4">Over {count} tasks completed</ThemedText>
      <View className="flex-row gap-5 w-[90%]">
        <Button
          className="flex-1"
          text="Login"
          onPress={() => router.push("/(auth)/login")}
        />
        <Button
          className="flex-1"
          text="Register"
          onPress={() => router.push("/(auth)/register")}
        />
      </View>
    </Wrapper>
  );
}
