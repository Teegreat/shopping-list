import { View, Text, Alert } from "react-native";
import React from "react";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useClerk, useUser } from "@clerk/clerk-expo";
import Button from "@/components/ui/button";
import { appleRed } from "@/constants/Colors";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              await user?.delete();
              router.replace("/(auth)");
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      await signOut();
      // Add your account deletion logic here
    } catch (error) {
      Alert.alert("Error", "Failed to delete account");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedText>Profile</ThemedText>
      <Button onPress={signOut} variant="ghost" textStyle={{ color: appleRed }}>
        Sign Out
      </Button>
      <Button
        onPress={handleDeleteAccount}
        variant="ghost"
        textStyle={{ color: "gray" }}
      >
        Delete Account
      </Button>
    </BodyScrollView>
  );
};

export default ProfileScreen;
