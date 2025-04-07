import * as SecureStore from "expo-secure-store";

export async function secureSave(key: string, value: string) {
  if (process.env.EXPO_OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function secureGet(key: string) {
  if (process.env.EXPO_OS === "web") {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

export async function secureDelete(key: string) {
  if (process.env.EXPO_OS === "web") {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
