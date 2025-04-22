import * as Haptics from "expo-haptics";
import {
  View,
  Text,
  Platform,
  StatusBar,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useClerk } from "@clerk/clerk-expo";
import Button from "@/components/ui/button";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Link, Stack, useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue, backgroundColors } from "@/constants/Colors";
import { useShoppingListIds } from "@/stores/ShoppingListsStore";
import { StyleSheet } from "react-native";
import IconCircle from "@/components/IconCircle";
import ShoppingListItem from "@/components/ShoppingListItem";

const HomeScreen = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const shoppingListIds = useShoppingListIds();

  const handleNewListPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/list/new");
  };

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <IconCircle
        emoji="🛒"
        backgroundColor={
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }
      />
      <Button onPress={handleNewListPress} variant="ghost">
        Create your first list
      </Button>
    </BodyScrollView>
  );

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue} style={{ marginRight: 10 }} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />

      <FlatList
        data={shoppingListIds}
        renderItem={({ item: listId }) => <ShoppingListItem listId={listId} />}
        contentContainerStyle={styles.listContainer}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={renderEmptyList}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 100,
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
});
