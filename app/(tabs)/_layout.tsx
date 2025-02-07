import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { Colors } from "@/constants/colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Role } from "@/models/user";

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
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          href: authState?.user?.role == Role.ADMIN ? "/admin" : null,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="user-gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
