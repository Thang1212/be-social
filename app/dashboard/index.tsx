import { Text } from "@/components/ui/Form";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { secureGet } from "@/utils/storage";
// import AppButton from "@/components/ui/AppButton";

export default function Page() {
    const router = useRouter();

    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            const token = await secureGet("token");
            setToken(token || "");
        };

        fetchToken();
    }, [])

    return (
        <View style={styles.container}>
            <Text>Hello dashboard {token}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E2F",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
    },
});
