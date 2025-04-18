import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { backgroundColors } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const ColorPickerScreen = () => {
  const { setSelectedColor } = useListCreation();
  const router = useRouter();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    router.back(); // Navigate back to the previous screen
  };

  return (
    <FlatList
      data={backgroundColors}
      renderItem={({ item }) => (
        <Pressable onPress={() => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          handleColorSelect(item);
        }}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
        >
          <View 
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: item,
            }}
          />
        </Pressable>
      )}
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{bottom: 0}}
      scrollIndicatorInsets={{bottom: 0}}
        contentContainerStyle={{
            padding: 16,
            gap: 16,
            paddingBottom: 100,
        }}
    />
  );
};

export default ColorPickerScreen;
