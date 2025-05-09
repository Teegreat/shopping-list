import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";

const EmojiPickerScreen = () => {
  const { setSelectedEmoji } = useListCreation();
  const router = useRouter();

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    router.back(); // Navigate back to the previous screen
  };

  return (
    <FlatList
      data={emojies}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleEmojiSelect(item)}
            style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 16}}
        >
          <Text style={{fontSize: 40}}>{item}</Text>
        </Pressable>
      )}
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
        }}
    />
  );
};

export default EmojiPickerScreen;
