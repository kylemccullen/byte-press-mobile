import Button from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import Wrapper from "@/components/ui/wrapper";
import UpdateNameModal from "@/components/update-name-modal";
import { AuthActionType, AuthContext } from "@/contexts/auth-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Settings() {
  const { authState, authDispatch } = useContext(AuthContext);
  const { user } = authState!;

  const logout = () => {
    authDispatch?.({ type: AuthActionType.LOGOUT });
    router.replace("/");
  };

  const text = useThemeColor("text");
  const lightText = useThemeColor("lightText");

  return (
    <Wrapper>
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>Settings</ThemedText>
      </View>
      <View style={styles.field}>
        <View style={styles.value}>
          <ThemedText style={styles.labelText}>Name:</ThemedText>
          <Text
            style={[styles.valueText, { color: user?.name ? text : lightText }]}
          >
            {user?.name ?? "Not Set"}
          </Text>
        </View>
        <UpdateNameModal />
      </View>
      <View style={styles.logout}>
        <Button text="Logout" onPress={logout} />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  labelText: {
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logout: {
    alignItems: "center",
  },
});
