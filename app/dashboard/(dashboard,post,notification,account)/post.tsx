import { createPost } from '@/api/posts';
import AppButton from '@/components/ui/AppButton';
import { Text } from '@/components/ui/Form';
import useAuth from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function Page() {
  const router = useRouter();

  const { token } = useAuth();

  const [text, setText] = useState('');

  const clientQuery = useQueryClient();

  function handlePost() {
    createPost(text, token)
      .then((post) => {
        clientQuery.invalidateQueries({ queryKey: ["posts"] });
        router.back();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>What 's your feeling?</Text>
        <TextInput
          autoCapitalize="none"
          value={text}
          style={styles.input}
          onChangeText={setText}
          multiline
        />
      </View>

      <AppButton style={styles.postButton} onPress={handlePost}>
        Post
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 66,
    paddingHorizontal: 24,
    gap: 12,
    // width: "90%",
    // flex: 1,
    // alignSelf: "center",
  },

  field: {
    gap: 12,
  },

  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    // width: "80%",
  },

  input: {
    height: 100,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },

  postButton: {
    width: '100%',
  },
});
