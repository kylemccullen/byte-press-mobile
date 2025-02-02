import Button from "@/components/ui/button";
import UpdateNameModal from "@/components/update-name-modal";
import { Colors } from "@/constants/colors";
import { AuthContext } from "@/contexts/auth-context";
import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function Settings() {
  const { setToken, user } = useContext(AuthContext);

  const logout = () => {
    setToken?.(undefined);
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.field}>
        <View style={styles.value}>
          <Text style={styles.labelText}>Name:</Text>
          <Text
            style={[
              styles.valueText,
              { color: user?.name ? "default" : Colors.lightText },
            ]}
          >
            {user?.name ?? "Not Set"}
          </Text>
        </View>
        <UpdateNameModal />
      </View>
      <View style={styles.logout}>
        <Button text="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 10,
  },
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
