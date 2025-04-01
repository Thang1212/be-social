import { Text } from "@/components/ui/Form";
import { Button, StyleSheet, View } from "react-native";

export default function Page() {
    return (
        <View style={styles.container}>
            <Button title="Sign up" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E2F",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 11,
        fontWeight: "bold",
    },
});
