import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
         console.log(`${key} found in cache`);
        } else {
            console.log('not found in cache: ' + key);
        }
        return item;
      } catch (error) {
        console.log(error);
      }
    },
    saveToken: async (key: string, token: string) => {
      try {
        await SecureStore.setItemAsync(key, token);
        console.log(`${key} saved in cache`);
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const tokenCache = Platform.OS !== "web" ? createTokenCache() : undefined;
