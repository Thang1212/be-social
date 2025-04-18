import { AppButton } from "@/components/ui/AppButton";
import { Text } from "@/components/ui/Form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  const { isLoggedIn, isLoading } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splash.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Let's GetSocial</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : isLoggedIn ? (
        <AppButton onPress={() => router.push("/dashboard/(dashboard)")}>
          Go to Dashboard
        </AppButton>
      ) : (
        <React.Fragment>
          <AppButton onPress={() => router.push("/sign-in")}>Sign In</AppButton>
          <AppButton
            style={styles.signUpButton}
            onPress={() => router.push("/sign-up")}
          >
            Sign Up
          </AppButton>
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E2F",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  logo: {
    width: 240,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "gray",
  },
});
