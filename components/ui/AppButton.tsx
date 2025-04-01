import { Text } from "@/components/ui/Form";
import { Button, Image, Pressable, StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { useRouter } from "expo-router";

export default function AppButton(
    { children, onPress, style }: {
        children: React.ReactNode;
        onPress: () => void;
        style?: StyleProp<ViewStyle>;
    }

) {
    const router = useRouter();

    return (
        <Pressable style={[styles.button, style]} onPress={onPress} >
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        width: 140,
        borderRadius: 8,
        backgroundColor: "#4A90E2",
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

});
