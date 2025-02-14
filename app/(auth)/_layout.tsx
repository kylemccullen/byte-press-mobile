import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const backgroundColor = useThemeColor("cardBackground");
  const text = useThemeColor("text");

  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerTintColor: text,
        headerStyle: {
          backgroundColor,
        },
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Forgot Password" }}
      />
    </Stack>
  );
}
