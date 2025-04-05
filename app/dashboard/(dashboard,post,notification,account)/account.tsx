import { Text } from '@/components/ui/Form';
import { secureDelete } from '@/utils/storage';
import { useRouter } from 'expo-router';
import { Button, Pressable, StyleSheet, TextInput, View } from 'react-native';

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <Button
        title="Log out"
        onPress={() => {
          secureDelete('token');
          router.replace('/');
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});
