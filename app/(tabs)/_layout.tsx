import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { Colors } from "@/constants/colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const { authState } = useContext(AuthContext);

  if (!authState?.token) router.replace("/");

  const backgroundColor = useThemeColor("cardBackground");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="tasks" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
