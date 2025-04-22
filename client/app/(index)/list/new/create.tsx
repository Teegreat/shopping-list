import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Link, Stack, useRouter } from "expo-router";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import { useListCreation } from "@/context/ListCreationContext";
import { useAddShoppingListCallback } from "@/stores/ShoppingListsStore";

const CreateScreen = () => {
  const [listName, setListName] = React.useState<string>("");
  const [listDescription, setListDescription] = React.useState<string>("");
  const { selectedEmoji, setSelectedColor, setSelectedEmoji, selectedColor } =
    useListCreation();

    const router = useRouter()

    const useAddShoppingList = useAddShoppingListCallback()

  const handleCreateList = () => {
    if(!listName) return

    const listId = useAddShoppingList(
      listName,
      listDescription,
      selectedEmoji,
      selectedColor
    )

    // todo: navigate to the  list details screen and pass listId

    router.replace({
      pathname: "/list/[listId]",
      params: { listId },
    })
  };

  useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    // cleanup function to reset the selected emoji and color when the component unmounts
    return () => {
      setSelectedEmoji("");
      setSelectedColor("");
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "New List",
          headerLargeTitle: false,
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Grocery Essentials"
            size="lg"
            variant="ghost"
            value={listName}
            onChangeText={setListName}
            returnKeyType="done"
            autoFocus
            onSubmitEditing={handleCreateList}
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
          <Link
            href={{
              pathname: "/emoji-picker",
            }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>

          <Link
            href={{
              pathname: "/color-picker",
            }}
            style={[styles.colorButton, { borderColor: selectedColor }]}
          >
            <View style={styles.colorContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
        />
        <Button onPress={handleCreateList} disabled={!listName} variant="ghost">
          Create list
        </Button>
      </BodyScrollView>
    </>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
