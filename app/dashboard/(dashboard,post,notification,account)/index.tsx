import { Text } from "@/components/ui/Form";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function Page() {
    return (
        <View style={styles.container}>
            <Text>Feed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 48,
    },
})