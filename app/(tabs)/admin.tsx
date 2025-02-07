import Card from "@/components/ui/card";
import SearchInput from "@/components/ui/search-input";
import StatusBar from "@/components/ui/status-bar";
import { ThemedText } from "@/components/ui/themed-text";
import Wrapper from "@/components/ui/wrapper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UserOverview } from "@/models/user";
import { getUsersOverview } from "@/util/user";
import React, { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";

export default function Admin() {
  const [users, setUsers] = useState<UserOverview[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserOverview[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getUsersOverview().then(setUsers);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user: UserOverview) => {
        return (
          user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
        );
      }),
    );
  }, [users, searchText]);

  const lightText = useThemeColor("lightText");

  return (
    <Wrapper>
      <ThemedText style={styles.title}>Admin Panel</ThemedText>
      <SearchInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          {filteredUsers.map((user: UserOverview) => (
            <Card key={user.email} style={{ gap: 15 }}>
              <View style={styles.cardHeader}>
                {user.name && (
                  <>
                    <ThemedText>{user.name}</ThemedText>
                    <Text style={{ color: lightText }}>({user.email})</Text>
                  </>
                )}
                {!user.name && <ThemedText>{user.email}</ThemedText>}
              </View>
              {user.totalTaskCount > 0 && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <ThemedText style={{ paddingBottom: 8 }}>
                      Tasks Complete
                    </ThemedText>
                    <Text style={{ color: lightText }}>
                      {user.completedTaskCount} / {user.totalTaskCount}
                    </Text>
                  </View>
                  <StatusBar
                    percentComplete={
                      (user.completedTaskCount / user.totalTaskCount) * 100
                    }
                  />
                </View>
              )}
            </Card>
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  searchInput: {
    marginBottom: 15,
  },
  container: {
    flex: 1,
    gap: 15,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 3,
  },
});
