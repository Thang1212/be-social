import Stack  from "@/components/ui/Stack";
import Tabs from "@/components/ui/Tabs";
import { View } from "react-native";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="post" 
                options={{
                    presentation: "modal",
                    headerTitle: "Create post",
                }}
            />
            <Stack.Screen 
                name="notifications" 
                options={{
                    presentation: "modal",
                    headerTitle: "Notifications",
                }}
            />
            <Stack.Screen 
                name="account" 
                options={{
                    presentation: "card",
                    headerTitle: "Account",
                }}
            />
        </Stack>
    )
}
