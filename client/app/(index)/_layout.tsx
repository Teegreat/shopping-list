import Button from "@/components/ui/button";
import { ListCreationProvider } from "@/context/ListCreationContext";
import ShoppingListsStore from "@/stores/ShoppingListsStore";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Platform } from "react-native";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export default function HomeRoutesLayout() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <TinyBaseProvider>
      <ShoppingListsStore />
      <ListCreationProvider>
        <Stack
          screenOptions={{
            ...(process.env.EXPO_OS !== "ios"
              ? {}
              : {
                  headerLargeTitle: true,
                  headerTransparent: true,
                  headerBlurEffect: "systemChromeMaterial",
                  headerLargeTitleShadowVisible: false,
                  headerShadowVisible: true,
                  headerLargeStyle: {
                    backgroundColor: "transparent",
                  },
                }),
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerTitle: "Shopping Lists" }}
          />
          <Stack.Screen
            name="list/new/index"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="profile"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.75, 1],
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="list/new/scan"
            options={{
              presentation: "fullScreenModal",
              headerLargeTitle: false,
              headerTitle: "Scan QR code",
              headerLeft: () => (
                <Button variant="ghost" onPress={() => router.back()}>
                  cancel
                </Button>
              ),
            }}
          />

          <Stack.Screen
            name="emoji-picker"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Choose an emoji",
              sheetAllowedDetents: [0.5, 0.75, 1],
            }}
          />

          <Stack.Screen
            name="color-picker"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Choose an color",
              sheetAllowedDetents: [0.5, 0.75, 1],
            }}
          />

          <Stack.Screen
            name="list/[listId]/product/new"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Add Product",
              sheetAllowedDetents: [0.8, 1],
            }}
          />

          <Stack.Screen
            name="list/[listId]/edit"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Edit Product",
              sheetAllowedDetents: [0.8, 1],
            }}
          />

          <Stack.Screen
            name="list/[listId]/share"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Share List",
            }}
          />

          <Stack.Screen
            name="list/[listId]/product/[productId]"
            options={{
              presentation: Platform.OS === "ios" ? "formSheet" : "modal",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              headerTitle: "Details",
              sheetAllowedDetents: [0.75, 1],
            }}
          />
        </Stack>
      </ListCreationProvider>
    </TinyBaseProvider>
  );
}
