import { View, Text, Platform, StatusBar, Pressable } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useClerk } from "@clerk/clerk-expo";
import Button from "@/components/ui/button";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Stack, useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";

const HomeScreen = () => {
  const { signOut } = useClerk();
  const router = useRouter ()

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push('/list/new')}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    )
  }

   const renderHeaderLeft = () => {
     return (
       <Pressable onPress={() => router.push('/profile')}>
         <IconSymbol name="gear" color={appleBlue} style={{marginRight: 10}} />
       </Pressable>
     );
   };

  return (
    <>
    <Stack.Screen options={{
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
    }} />
    <BodyScrollView
      contentContainerStyle={{
        padding: 16
      }}
      >
      <ThemedText type="title">Home</ThemedText>
      <Button onPress={signOut}>Sign Out</Button>
    </BodyScrollView>
      </>
  );
};

export default HomeScreen;
