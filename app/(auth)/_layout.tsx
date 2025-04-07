import Stack from "@/components/ui/Stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Get Social",
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "card",
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          presentation: "card",
          title: "Sign Up",
        }}
      />
    </Stack>
  );
}
