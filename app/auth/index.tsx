import { Text } from "@/components/ui/Form";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/ui/AppButton";

export default function Page() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image 
                source={require("@/assets/images/splash.jpeg")} 
                style={styles.logo}
            />
            <Text style={styles.title}>Time to be Social</Text>

            <AppButton onPress={() => router.push("/auth/sign-in")}>Sign in</AppButton>
            <AppButton style={styles.signUpButton} onPress={() => router.push("/auth/sign-up")}>Sign up</AppButton>
            {/* <Pressable style={styles.signInButton} onPress={() => router.push("/auth/sign-in")} >
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>

            <Pressable style={styles.signUpButton} onPress={() => router.push("/auth/sign-up")} >
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable> */}
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
