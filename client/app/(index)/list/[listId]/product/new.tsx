import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TextInput from "@/components/ui/text-input";
import { useAddShoppingListProductCallback } from "@/stores/ShoppingListStore";

const NewItemScreen = () => {
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name, setName] = useState("");
  const [units, setUnits] = useState("kg");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const addShoppingListProduct = useAddShoppingListProductCallback(listId);

  const handleCreateProduct = () => {
    if (!name) {
      return;
    }

    addShoppingListProduct(name, quantity, units, notes);

    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "Add product",
          headerRight: () => (
            <Button
              variant="ghost"
              onPress={handleCreateProduct}
              disabled={!name}
            >
              Save
            </Button>
          ),
          headerLeft: () => (
            <Button variant="ghost" onPress={() => router.back()}>
              Cancel
            </Button>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <BodyScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 16,
          }}
        >
          <TextInput
            label="Name"
            placeholder="Potatoes"
            value={name}
            onChangeText={setName}
            autoFocus={true}
            onSubmitEditing={handleCreateProduct}
            returnKeyType="done"
          />

          <TextInput
            label="Units"
            placeholder="kg"
            value={units}
            onChangeText={setUnits}
            keyboardType="numeric"
            returnKeyType="done"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ThemedText>
              x{quantity} {units}
            </ThemedText>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                onPress={() => setQuantity(Math.max(0, quantity - 1))}
                variant="ghost"
              >
                <IconSymbol name="minus" color={"gray"} />
              </Button>
              <Button onPress={() => setQuantity(quantity + 1)} variant="ghost">
                <IconSymbol name="plus" color={"gray"} />
              </Button>
            </View>
          </View>
          <TextInput
            label="Notes"
            placeholder="potatoes are good"
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={{
              height: 100,
            }}
          />
          {Platform.OS === "android" && (
            <Button onPress={handleCreateProduct} disabled={!name}>
              Add product
            </Button>
          )}
        </BodyScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewItemScreen;
