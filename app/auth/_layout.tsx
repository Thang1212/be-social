import Stack  from "@/components/ui/Stack";
import { View } from "react-native";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    headerShown: false,
                    // headerTitle: "Sign in",
                }}
            />

            <Stack.Screen 
                name="sign-in" 
                options={{
                    presentation: "card",
                    title: "Sign in",
                }}
            />

            <Stack.Screen 
                name="sign-up" 
                options={{
                    presentation: "card",
                    title: "Sign up",
                }}
            />

        </Stack>
    )
}
