import { AuthProvider } from "@/contexts/auth-context";
import { TaskProvider } from "@/contexts/task-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "./global.css";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </TaskProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </>
  );
}
