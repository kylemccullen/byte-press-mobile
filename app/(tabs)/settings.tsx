import Button from "@/components/ui/button";
import Header from "@/components/ui/header";
import { ThemedText } from "@/components/ui/themed-text";
import Wrapper from "@/components/ui/wrapper";
import UpdateNameModal from "@/components/update-name-modal";
import { AuthActionType, AuthContext } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { useContext } from "react";
import { View, Text } from "react-native";

export default function Settings() {
  const { authState, authDispatch } = useContext(AuthContext);
  const { user } = authState!;

  const logout = () => {
    authDispatch?.({ type: AuthActionType.LOGOUT });
    router.replace("/");
  };

  return (
    <Wrapper>
      <Header title="Settings" />
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <ThemedText className="text-xl">Name:</ThemedText>
          <ThemedText light={!user?.name} className="text-xl font-bold">
            {user?.name ?? "Not Set"}
          </ThemedText>
        </View>
        <UpdateNameModal />
      </View>
      <View className="items-center">
        <Button text="Logout" onPress={logout} />
      </View>
    </Wrapper>
  );
}
