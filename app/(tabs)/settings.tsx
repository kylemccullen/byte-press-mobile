import Button from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth-context";
import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Settings() {
  const { setToken } = useContext(AuthContext);

  const logout = () => {
    setToken?.(undefined);
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Button text="Logout" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
