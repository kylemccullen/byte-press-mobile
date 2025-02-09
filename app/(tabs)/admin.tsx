import Card from "@/components/ui/card";
import Header from "@/components/ui/header";
import SearchInput from "@/components/ui/search-input";
import StatusBar from "@/components/ui/status-bar";
import { ThemedText } from "@/components/ui/themed-text";
import Wrapper from "@/components/ui/wrapper";
import { LIGHT_TEXT } from "@/constants/colors";
import { UserOverview } from "@/models/user";
import { getUsersOverview } from "@/util/user";
import { cn } from "@/util/utils";
import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, RefreshControl } from "react-native";

export default function Admin() {
  const [users, setUsers] = useState<UserOverview[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserOverview[]>([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = () => {
    getUsersOverview().then((users: UserOverview[]) => {
      setUsers(users);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    loadData();
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

  return (
    <Wrapper>
      <Header title="Admin Panel" />
      <SearchInput
        className="mb-2"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView
        className="flex-1 gap-3"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      >
        <View className="flex-1 gap-3">
          {filteredUsers.map((user: UserOverview) => (
            <Card key={user.email} className="gap-3">
              <View className="flex-row gap-1">
                {user.name && (
                  <>
                    <ThemedText>{user.name}</ThemedText>
                    <Text className={cn(LIGHT_TEXT)}>({user.email})</Text>
                  </>
                )}
                {!user.name && <ThemedText>{user.email}</ThemedText>}
              </View>
              {user.totalTaskCount > 0 && (
                <View>
                  <View className="flex-row justify-between">
                    <ThemedText className="pb-2">Tasks Complete</ThemedText>
                    <Text className={cn(LIGHT_TEXT)}>
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
